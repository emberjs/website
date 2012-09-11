require_relative "./highlighter"

module APIDocs
  class << self
    def registered(app)
      app.helpers Helpers

      app.after_configuration do
        ApiClass.data = data.api

        page "/api*", :directory_index => false, :layout => "api_layout"

        data.api['classes'].each do |name, data|
          page "/api/classes/#{name}.html", :proxy => "api/class.html", :layout => "api_layout" do
            @class = ApiClass.find(name)
          end
        end

        data.api['modules'].each do |name, data|
          page "/api/modules/#{name}.html", :proxy => "api/module.html", :layout => "api_layout" do
            @module = data
          end
        end
      end
    end
    alias :included :registered
  end

  class CodeRenderer < Redcarpet::Render::HTML
    include Highlighter::Helpers

    def block_code(code, language)
      _highlight(code, language || 'javascript')
    end
  end

  class ApiClass
    @@cache = {}
    cattr_reader :cache

    @@data = nil
    cattr_accessor :data

    def self.find(name)
      cache[name] || new(name)
    end

    def initialize(name)
      @data = self.class.data['classes'][name]
    end

    def to_s
      return self.name
    end

    def extends
      @extends ||= @data['extends'] && self.class.find(@data['extends'])
    end

    def uses
      @uses ||= @data['uses'] ?
                  @data['uses'].map{|u| self.class.find(u) } :
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
      @data[attr]
    end

    def method_missing(method)
      @data[method]
    end
  end

  module Helpers
    GITHUB_SHA = "yuidoc"

    def api_modules
      data.api['modules'].sort
    end

    def api_classes
      data.api['classes'].select{|_,c| !c['static'] }.sort
    end

    def api_namespaces
      data.api['classes'].select{|_,c| c['static'] }.sort
    end

    def api_file_link(item)
      path = item['file'].sub(/^\.\.\//, '')

      title = path
      link  = "https://github.com/wagenet/ember.js/tree/#{GITHUB_SHA}/#{path}"

      if line = item['line']
        title += ":#{line}"
        link += "#L#{line}"
      end

      link_to title, link
    end

    def api_module(name)
      return name if name.is_a?(Hash)
      data.api['modules'][name]
    end

    def api_class(name)
      return name if name.is_a?(ApiClass)
      name = name['name'] if name.is_a?(Hash)
      ApiClass.find(name)
    end
    alias :api_namespace :api_class

    def api_module_link(name, anchor=nil)
      link = "/api/modules/#{name}.html"
      link += '#'+anchor if anchor
      link_to name, link
    end

    def api_class_link(name, anchor=nil)
      link = "/api/classes/#{name}.html"
      link += '#'+anchor if anchor
      link_to name, link
    end
    alias :api_namespace_link :api_class_link

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
      Redcarpet::Markdown.new(CodeRenderer,
        :layout_engine => :erb,
        :fenced_code_blocks => true,
        :lax_html_blocks => true).render(string)
    end

    def sanitize_class(string)
      string.gsub(/[^a-z0-9_-]+/i, '_');
    end
  end
end

::Middleman::Extensions.register(:api_docs, APIDocs)