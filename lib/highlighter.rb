require "redcarpet"
require "coderay"
require "nokogiri"

module Highlighter
  class MissingLanguageError < StandardError; end
  class << self
    def registered(app)
      app.helpers Helpers
    end
    alias :included :registered
  end

  module Helpers
    def _highlight(string, language, class_name=nil)
      error_message = "Code blocks must be fenced with proper language designated. If you don't know what language to use, specify ```text.\n\n"
      error_message << "Offending Code Block:\n\n#{string}"

      language ||= 'text'
      #raise MissingLanguageError, error_message if language.nil?

      language, file_name, changes = _detect_language_filename_and_changes(language)

      result = %Q{<div class="highlight #{language} #{class_name}">}
      result += '<div class="ribbon"></div>'
      result += '<div class="scroller">'
      result += _code_table(string, language, file_name, changes)
      result += '</div>'
      result += %Q{</div>}
      result
    end

    def _detect_language_filename_and_changes(language)
      file_name = nil
      changes = []
      changes_regex = /\{(.+)\}$/
      bare_language_regex = /\A\w+\z/

      if change_numbers = changes_regex.match(language)
        language = language.sub(changes_regex, '')

        changes = _parse_changes(change_numbers[1])
      end

      unless language =~ bare_language_regex
        file_name = language

        language = _determine_language(language)
      end
      [language, file_name, changes]
    end

    def _determine_language(language)
      case /\.(\w+)$/.match(language)[1]
      when 'hbs'
        'handlebars'
      when 'js'
        'javascript'
      when 'html'
        'html'
      when 'css'
        'css'
      when 'json'
        'json'
      end
    end

    def _parse_changes(change_numbers)
      changes = change_numbers.split(',').map do |change|
        state = case change.slice(0)
                when '+'
                  'added'
                when '-'
                  'removed'
                else
                  nil
                end

        [change.to_i.abs, state]
      end
    end

    def _code_table(string, language, file_name, changes)
      code = CodeRay.scan(string, language)

      table = code.div css: :class,
        line_numbers: :table,
        line_number_anchors: false

      if file_name.present?

        table = table.sub('<table class="CodeRay">', <<-HEADER)
<table class="CodeRay">
  <thead>
    <tr>
      <td colspan="2">#{file_name}</td>
    </tr>
  </thead>
HEADER
      end

      _highlight_lines(table, changes)
    end

    def _highlight_lines(table, highlights)
      return table if highlights.empty?

      table_xml = Nokogiri.XML(table)

      numbers_node = table_xml.at_xpath('//td[@class="line-numbers"]/pre')
      code_node = table_xml.at_xpath('//td[@class="code"]/pre')

      numbers_contents = numbers_node.inner_html.split("\n")
      code_contents = code_node.inner_html.split("\n")

      highlights.each do |line_number, state|
        index = line_number - 1
        numbers_contents[index] = "<span class=\"highlight-line #{state}\">#{numbers_contents[index]}</span>"
        code_contents[index] = "<span class=\"highlight-line #{state}\">#{code_contents[index]}</span>"
      end

      numbers_node.inner_html = numbers_contents.join("\n")
      code_node.inner_html = code_contents.join("\n")

      table_xml.to_xml
    end

    def highlight(language, class_name, &block)
      concat(_highlight(capture(&block), language, class_name))
    end
  end

  class HighlightedHTML < Redcarpet::Render::HTML
    include Helpers

    def header(text, level)
      "<h#{level} class='anchorable-toc' id='toc_#{TOC::TableOfContents.anchorify(text)}'>#{text}</h#{level}>"
    end

    def block_code(code, language)
      _highlight(code, language)
    end
  end
end

::Middleman::Extensions.register(:highlighter, Highlighter)
