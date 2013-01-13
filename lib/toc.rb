require 'redcarpet'

module TOC
  class << self
    def registered(app)
      app.helpers Helpers
    end
    alias :included :registered
  end

  module TableOfContents
    extend self

    def anchorify(text)
      text.gsub(/&#?\w+;/, '-').gsub(/\W+/, '-').gsub(/^-|-$/, '').downcase
    end
  end

  module Helpers
    def index_for(data)
      result = '<ol id="toc-list">'

      data.each_entry do |section, entries|
        next if entries.any? do |entry|
          entry[:skip_sidebar]
        end

        current_url = request.path.split('/')[2]
        sub_url     = request.path.split('/')[3]
        intro_page  = sub_url == 'index.html'
        sub_url     = nil if intro_page
        chapter     = entries[0].url.split("/")[0]

        current = (chapter == current_url)

        result << %Q{
          <li class="level-1#{current ? ' selected' : ''}">
            <a href="/guides/#{entries[0].url}">#{section}</a>
            <ol#{current ? " class='selected'" : ''}>
        }

        entries.each do |entry|
          current_segment = entry.url.split("/")[1]

          sub_current = if current_segment and current_segment == sub_url
            true
          elsif intro_page and current_url == entry.url
            true
          else
            false
          end

          result << %Q{
            <li class="level-3#{sub_current ? ' sub-selected' : ''}">
              <a href="/guides/#{entry.url}">#{entry.title}</a>
            </li>
          }
        end

        result << '</ol></li>'
      end

      result << '</ol>'

      result
    end

    def chapter_name
      guides = data.guides

      sub_url = request.path.split('/')[2]
      heading = ''

      guides.each_entry do |section, entries|
        if entries[0].url.split('/')[0] == sub_url
          heading = section
          break
        end
      end
      heading
    end

    def chapter_heading
      name = chapter_name.strip
      return if name.blank?
      %Q{<h1>#{name}</h1>}
    end

    def section_slug
      request.path.split('/')[2]
    end

    def guide_slug
      request.path.split('/')[3]
    end

    def current_section
      data.guides.find do |section, entries|
        entries[0].url.split('/')[0] == section_slug
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
  end
end

::Middleman::Extensions.register(:toc, TOC)
