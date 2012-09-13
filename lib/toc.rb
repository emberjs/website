require "redcarpet"

module TOC
  class << self
    def registered(app)
      app.helpers Helpers
    end
    alias :included :registered
  end

  class TableOfContents < Redcarpet::Render::Base
    def self.anchorify(text)
      text.gsub(/&#?\w+;/, '-').gsub(/\W+/, '-').gsub(/^-|-$/, '').downcase
    end

    def initialize
      @current_level = 0
      @toc_count = 0
      @result = []
      super
    end

    def header(text, level)
      @toc_count += 1

      return "" if level > 3
      link = "<a href=\"#toc_#{TableOfContents.anchorify(text)}\">#{text}</a>"
      @result << %Q{<li class="level-#{level}">#{link}</li>}

      ""
    end

    def postprocess(text)
      "<ol>" + @result.join("") + "</ol>"
    end
  end

  module Helpers
    def table_of_contents
      chapters = data.docs.chapters
      chapters = chapters.collect_concat do |file|
         File.read("source/docs/#{file}.md")+"\n"
      end
      
      toc = TableOfContents.new()
      markdown = Redcarpet::Markdown.new(toc, fenced_code_blocks: true)
      markdown.render(chapters.join(''))
    end

    def table_of_contents_for(file)
      document = File.read("source/#{file}")

      toc = TableOfContents.new()
      markdown = Redcarpet::Markdown.new(toc, fenced_code_blocks: true)

      markdown.render(document)
    end
  end
end

::Middleman::Extensions.register(:toc, TOC)