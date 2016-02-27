require_relative "./highlighter"

module APIDocs
  class << self

    def registered(app, options={})
      app.helpers Helpers

      app.after_configuration do

        @apis = {}

        options.each do |key, opts|

          api = Api.new(key, opts)
          api.data = data.send opts[:data]

          @apis[key] = api

          page "/#{opts[:root]}*", directory_index: false, layout: 'layouts/api'

          api.classes.each do |name, api_class|
            page "/#{opts[:root]}/classes/#{name}.html", proxy: 'api/class.html', layout: 'layouts/api' do
              @title = name
              @class = api_class
            end

            if name == opts[:default_class]
              page "/#{opts[:root]}/index.html", proxy: 'api/class.html', layout: 'layouts/api' do
                @title = name
                @class = api_class
              end
            end
          end

          api.modules.each do |name, api_module|
            page "/#{opts[:root]}/modules/#{name}.html", proxy: 'api/module.html', layout: 'layouts/api' do
              @title = name
              @module = api_module
            end
          end

          # Update data caches
          files.changed("data/#{opts[:data]}.yml") do
            @apis[key].data = data.send opts[:data]
          end
        end
      end
    end
    alias :included :registered
  end

  class Api
    attr_reader :key
    attr_reader :opts
    attr_reader :modules
    attr_reader :classes
    attr_reader :data

    def initialize(key, opts)
      @key = key
      @opts = opts
      @modules = {}
      @classes = {}
    end

    def data=(data)
      @data = data
      @modules = {}
      data['modules'].each_pair do |name, data|
        @modules[name] = ModuleWrapper.new(name, data, self)
      end
      @classes = {}
      data['classes'].each_pair do |name, data|
        @classes[name] = ClassWrapper.new(name, data, self)
      end
    end

    def name
      @opts[:name]
    end

    def default_class
      @opts[:default_class]
    end

    def root
      @opts[:root]
    end

    def repo_url
      @opts[:repo_url]
    end

    def sha
      data['project']['sha']
    end

    def sha_url
      "#{repo_url}/commits/#{sha}"
    end

    def tree_url(path)
      "#{repo_url}/tree/#{sha}/#{path}"
    end

    def [](attr)
      @opts[attr]
    end
  end

  class ModuleWrapper
    attr_reader :name

    def initialize(name, data, cache)
      @name = name
      @data = data
      @cache = cache
    end

    def to_s
      return self.name
    end

    def [](attr)
      @data[attr]
    end

    def method_missing(method, *args)
      @data[method]
    end
  end

  class ClassWrapper
    attr_reader :native
    attr_reader :name

    def initialize(name, data, cache)
      @name = name
      @cache = cache
      if data
        @native = false
        @ldata = data
      else
        @native = true
        @ldata = {}
      end
    end

    def to_s
      return self.name
    end

    def extends
      @extends ||= @ldata['extends'] && @cache.find_class(@ldata['extends'])
    end

    def uses
      @uses ||= @ldata['uses'] ?
                  @ldata['uses'].map{|u| @cache.find_class(u) } :
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

        @cache.data.classitems.each do |item|
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

    def _apiForResource(resource)
      # always pick the closest (longest) match
      # i.e. /api/data should match /api/data and not /api
      sorted = @apis.values.sort { |x,y| y.root.length <=> x.root.length }
      api = sorted.find {|api| resource.url.start_with? "/#{api.root}" }
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

    def api_li_class(api_key, class_name = nil)
      current_api = _apiForResource(current_resource)
      class_name || 'sub-selected' if current_api.key == api_key
    end

    def selected_class(key, class_name = nil)
      class_name || 'selected' if current?(key)
    end

    def sha
      _apiForResource(current_resource).sha
    end

    def sha_url
      _apiForResource(current_resource).sha_url
    end

    def api_modules
      _apiForResource(current_resource).modules.sort
    end

    def api_classes
      _apiForResource(current_resource).classes.select{|_,c| !c['static'] }.sort
    end

    def api_namespaces
      _apiForResource(current_resource).classes.select{|_,c| c['static'] }.sort
    end

    def api_file_link(item, options = {})
      api = _apiForResource(current_resource)

      return unless item['file']
      path = item['file'].sub(/^\.\.\//, '')

      options[:class] ||= 'api-file-link'

      title = path
      link  = api.tree_url(path)

      if line = item['line']
        title += ":#{line}"
        link += "#L#{line}"
      end

      title = options.delete(:title) || title

      link_to title, link, options
    end

    def api_module(name)
      return name if name.is_a?(ModuleWrapper)
      _apiForResource(current_resource).modules[name]
    end

    def api_class(name)
      return name if name.is_a?(ClassWrapper)
      name = name['name'] if name.is_a?(Hash)
      _apiForResource(current_resource).classes[name]
    end
    alias :api_namespace :api_class

    def api_module_link(name, anchor=nil)
      api = _apiForResource(current_resource)
      link = "/#{api.root}/modules/#{name}.html"
      link += '#'+anchor if anchor
      link_to name, link
    end

    def api_class_link(name, anchor=nil)
      api = _apiForResource(current_resource)
      api_class = api.classes[name]
      if api_class && !api_class.native # do we need this?
        link = "/#{api.root}/classes/#{name}.html"
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
