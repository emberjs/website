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

        current_url = request.path.split("/")[2]
        sub_url     = request.path.split("/")[3]
        sub_url     = nil if sub_url == "index.html" # For intro pages
        chapter     = entries[0].url.split("/")[0]

        if chapter == current_url
          current = true
        end

        result += %Q{<li class="level-1#{current ? ' selected' : ''}"><a href="/guides/#{entries[0].url}">#{section}</a>}
        result += %Q{<ol#{current ? " class='selected'" : ''}>}
        entries.each do |entry|
          if entry.url.split("/")[1] == sub_url
            sub_current = true
          end

          result += %Q{<li class="level-3#{sub_current ? ' sub-selected' : ''}"><a href="/guides/#{entry.url}">#{entry.title}</a></li>}
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
      name = chapter_name.strip
      return if name.blank?
      %Q{<h1> #{name} </h1>}
    end

    def section_slug
      request.path.split('/')[2]
    end

    def guide_slug
      request.path.split('/')[3]
    end

    def current_section
      data.guides.find do |section, entries|
        entries[0].url.split("/")[0] == section_slug
      end
    end

    def current_guide
      if guide_slug == 'index.html'
        current_section[1][0]
      else
        current_section[1].find{|guide| guide.url.split('/')[1] == guide_slug}
      end
    end

    def chapter_links
      %Q{
      <footer>
        #{previous_chapter_link} #{next_chapter_link}
      </footer>
      }
    end

    def previous_chapter_link
      return '' unless previous_chapter
      %Q{
        <a class="previous-guide" href="/guides/#{previous_chapter.url}">
          \u2190 #{previous_chapter.title}
        </a>
      }
    end

    def next_chapter_link
      return '' unless next_chapter
      %Q{
      <a class="next-guide" href="/guides/#{next_chapter.url}">
        #{next_chapter.title} \u2192
      </a>
      }
    end

    def previous_chapter
      return if not current_section

      guides = current_section[1]
      current_index = guides.find_index(current_guide)
      if current_index != 0
        guides[current_index-1]
      else
        nil
      end
    end

    def next_chapter
      return if not current_section

      guides = current_section[1]
      current_index = guides.find_index(current_guide)
      if current_index < guides.length
        guides[current_index+1]
      else
        nil
      end
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
