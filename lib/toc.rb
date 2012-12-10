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
    def guides_index
      guides = data.guides

      result = '<ol id="guide_list">'
      guides.each_entry do |section, entries|

        if entries[0].url.split("/")[0] == request.path.split("/")[2]
            current = true
        end


        result += %Q{<li class="level-1#{current ? ' selected' : ''}"><a href="/guides/#{entries[0].url}">#{section}</a>}
        result += %Q{<ol#{current ? " class='selected'" : ''}>}
        entries.each do |entry|

          if entry.url.split('/')[-1] == request.path.split("/")[-2]
            result += %Q{<li class="level-3 active"><a href="/guides/#{entry.url}">#{entry.title}</a></li>}
          else
            result += %Q{<li class="level-3"><a href="/guides/#{entry.url}">#{entry.title}</a></li>}
          end
        end
        result += '</ol></li>'
      end
      result += '</ol>'
    end

    def chapter_name
      guides = data.guides

      heading = ""
      guides.each_entry do |section, entries|
        if entries[0].url.split("/")[0] == request.path.split("/")[2]
          heading = section
          break
        end
      end
      heading
    end

    def chapter_heading
      name = chapter_name
      name ? %Q{<h1> #{name} </h1>} : nil
    end

    def table_of_contents
      chapters = data.documentation.chapters
      chapters = chapters.collect_concat do |file|
         File.read("source/documentation/#{file}.md")+"\n"
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
