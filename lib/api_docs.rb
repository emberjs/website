require_relative "./highlighter"

module APIDocs
  class << self

    def registered(app, options={})
      app.helpers Helpers

      app.after_configuration do

        @apis = {}

        options.each do |key, opts|
          @apis[key] = opts

          api_data = data.send opts[:data]

          @apis[key][:api_class] = Class.new(ApiClass)
          @apis[key][:api_class].data = api_data

          page "/#{opts[:root]}*", directory_index: false, layout: 'layouts/api'

          api_data.fetch('classes').each do |name, data|
            page "/#{opts[:root]}/classes/#{name}.html", proxy: 'api/class.html', layout: 'layouts/api' do
              @title = name
              @class = @apis[key][:api_class].find(name)
            end

            if name == opts[:default_class]
              page "/#{opts[:root]}/index.html", proxy: 'api/class.html', layout: 'layouts/api' do
                @title = name
                @class = @apis[key][:api_class].find(name)
              end
            end
          end

          api_data.fetch('modules').each do |name, data|
            page "/#{opts[:root]}/modules/#{name}.html", proxy: 'api/module.html', layout: 'layouts/api' do
              @title = name
              @module = data
            end
          end

          # Update data caches
          files.changed("data/#{opts[:data]}.yml") do
            @apis[key][:api_class].data = api_data
          end
        end
      end
    end
    alias :included :registered
  end

  class ApiClass
    @cache = {}

    @data = nil
    class << self
      attr_reader :cache
      attr_reader :data
    end

    def self.data=(value)
      @cache = {}
      @data = value
    end

    def self.find(name)
      cache[name] ||= new(name)
    end

    attr_reader :native

    def initialize(name)
      data = self.class.data['classes'][name]

      if data
        @native = false
        @ldata = data
      else
        @native = true
        @ldata = {}
      end
    end

    #def self.inherited(subclass)
    #  subclass.instance_variable_set(:@cache,

    def to_s
      return self.name
    end

    def extends
      @extends ||= @ldata['extends'] && self.class.find(@ldata['extends'])
    end

    def uses
      @uses ||= @ldata['uses'] ?
                  @ldata['uses'].map{|u| self.class.find(u) } :
                  []
    end

    def classitems
      unless @classitems
        @classitems = {}

        # Go from root up
        parents = ([extends] + uses.reverse).compact
        parents.each do |parent|
          parent.classitems.each do |type, items|
            items.each do |_, item|
              item = item.clone
              @classitems[item['itemtype']] ||= {}
              existing = @classitems[item['itemtype']][item['name']]
              if existing
                next if existing['class'] == item['class']
                item['overwritten_from'] = existing
              else
                item['extended_from'] = parent
              end
              @classitems[item['itemtype']][item['name']] = item
            end
          end
        end

        self.class.data.classitems.each do |item|
          next if item['class'] != self.name

          item = item.clone
          @classitems[item['itemtype']] ||= {}
          if existing = @classitems[item['itemtype']][item['name']]
            item['overwritten_from'] = existing
          end
          @classitems[item['itemtype']][item['name']] = item
        end
      end

      @classitems
    end

    def [](attr)
      @ldata[attr]
    end

    def method_missing(method, *args)
      @ldata[method]
    end
  end

  module Helpers
    def current?(key)
      request_key = _request_as_key

      category_match = request_key[:category] == key[:category]
      name_match = request_key[:name] == key[:name]

      if key[:name].present?
        category_match and name_match
      else
        category_match
      end
    end

    def _file_to_category(file)
      lookup ||= begin
        obj = {}

        api_modules.map(&:first).each_with_object(obj) do |file, hash|
          hash[file] = :modules
        end

        api_classes.map(&:first).each_with_object(obj) do |file, hash|
          hash[file] = :classes
        end

        api_namespaces.map(&:first).each_with_object(obj) do |file, hash|
          hash[file] = :namespaces
        end
      end

      lookup[file]
    end


    def _request_as_key
      path = request.path.split('/')
      file = File.basename(path.pop, '.html')

      category = _file_to_category(file)

      {
        name: file,
        category: category
      }
    end

    def _level
      @level ||= 0
      @level += 1
      yield(@level)
      @level -= 1
    end

    def _currentAPI(resource)
      # always pick the closest (longest) match
      # i.e. /api/data should match /api/data and not /api
      matches = @apis.find_all { |name, opts| resource.url.start_with? "/" + opts[:root] }
      matches.sort_by { |name, opts| opts[:root].length }.last
    end

    def _metadataForResource(resource)
      _currentAPI(resource).last
    end

    def _dataForResource(resource)
      data.send _metadataForResource(resource)[:data]
    end

    def li_for(category, options = {}, &block)
      class_name = options[:class]
      key = {
        category: category,
        name: options[:name]
      }

      _level do |level|
        concat(%Q{
          <li class="level-#{level} #{selected_class(key, class_name)}">
          #{capture(&block)}
          </li>
        })
      end
    end

    def ol_for(category, options = {}, &block)
      class_name = options[:class]

      key = {
        category: category,
        name: options[:name]
      }

      _level do |level|
        concat(%Q{
          <ol class="#{selected_class(key, class_name)}">
          #{capture(&block)}
          </ol>
        })
      end
    end

    def api_li_class(name, class_name = nil)
      current = _currentAPI(current_resource).first
      class_name || 'sub-selected' if current == name
    end

    def selected_class(key, class_name = nil)
      class_name || 'selected' if current?(key)
    end

    def sha
      _dataForResource(current_resource).fetch('project')['sha']
    end

    def sha_url
      #"#{APIDocs.repo_url}/tree/#{sha}"
      repo_url = _metadataForResource(current_resource)[:repo_url]
      "#{repo_url}/commits/#{sha}"
    end

    def api_modules
      _dataForResource(current_resource)['modules'].sort
    end

    def api_classes
      _dataForResource(current_resource)['classes'].select{|_,c| !c['static'] }.sort
    end

    def api_namespaces
      _dataForResource(current_resource)['classes'].select{|_,c| c['static'] }.sort
    end

    def api_file_link(item, options = {})
      metadata = _metadataForResource(current_resource)
      api_class = metadata[:api_class]
      repo_url = metadata[:repo_url]

      return unless item['file']
      path = item['file'].sub(/^\.\.\//, '')

      options[:class] ||= 'api-file-link'

      title = path
      link  = "#{repo_url}/tree/#{api_class.data['project']['sha']}/#{path}"

      if line = item['line']
        title += ":#{line}"
        link += "#L#{line}"
      end

      title = options.delete(:title) || title

      link_to title, link, options
    end

    def api_module(name)
      return name if name.is_a?(Hash)
      _dataForResource(current_resource)['modules'][name]
    end

    def api_class(name)
      api_class = _metadataForResource(current_resource)[:api_class]
      return name if name.is_a?(ApiClass)
      name = name['name'] if name.is_a?(Hash)
      api_class.find(name)
    end
    alias :api_namespace :api_class

    def api_module_link(name, anchor=nil)
      metadata = _metadataForResource(current_resource)
      link = "/#{metadata[:root]}/modules/#{name}.html"
      link += '#'+anchor if anchor
      link_to name, link
    end

    def api_class_link(name, anchor=nil)
      metadata = _metadataForResource(current_resource)
      klass = api_class(name)
      if klass && !klass.native
        link = "/#{metadata[:root]}/classes/#{name}.html"
        link += '#'+anchor if anchor
        link_to name, link
      else
        name
      end
    end
    alias :api_namespace_link :api_class_link

    def api_param_type(item)
      type = api_class_link item['type']
      type = "[#{type}]" if item['optional']
      type
    end

    def api_classes_for_item(item)
      classes = [item['access']]
      classes << 'deprecated' if item['deprecated']
      classes << 'inherited' if item['extended_from']
      classes.compact.join(' ')
    end

    def api_classes_for_class(klass)
      api_classes_for_item(api_class(klass))
    end
    alias :api_classes_for_namespace :api_classes_for_class

    def api_markdown(string)
      unless string.nil?
        Redcarpet::Markdown.new(Highlighter::HighlightedHTML,
          :layout_engine => :erb,
          :autolink => true,
          :fenced_code_blocks => true,
          :lax_html_blocks => true).render(string)
      end
    end

    def sanitize_class(string)
      string.gsub(/[^a-z0-9_-]+/i, '_');
    end
  end
end

::Middleman::Extensions.register(:api_docs, APIDocs)
