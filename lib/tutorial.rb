require_relative './highlighter'

module Tutorial
  class << self
    def registered(app, options = {})
      app.helpers Helpers

      app.after_configuration do
        page '/learn/tutorial*', layout: 'layouts/tutorial'

        @sections = data.tutorial
      end
    end
    alias :included :registered
  end

  module Helpers
    def current_section
      @current_section ||= data.tutorial.find do |section|
        current_resource.url.split(?/).last == section.path
      end
    end

    def tutorial_section_title
      current_section && current_section.title
    end

    def current_index
      @current_index ||= data.tutorial.index(current_section)
    end

    def previous_section
      data.tutorial[current_index - 1] if current_index && current_index > 0
    end

    def next_section
      data.tutorial.fetch(current_index + 1, nil) if current_index
    end

    def link_to_previous_section(options = {})
      title = previous_section.title
      link  = previous_section.path

      link_to title, link, options
    end

    def link_to_next_section(options = {})
      title = next_section.title
      link  = next_section.path

      link_to title, link, options
    end

    def current_section_class(section, class_name = nil)
      class_name || 'sub-selected' if current_resource.url.match(section.path)
    end
  end
end

::Middleman::Extensions.register(:tutorial, Tutorial)
