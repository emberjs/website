require "redcarpet"
require "pygments"
require "active_support/core_ext"

###
# Helpers
###

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

class TableOfContents < Redcarpet::Render::Base
  def initialize
    @current_level = 0
    @result = []
    super
  end

  def header(text, level)
    return if level > 3

    result = @result

    if level > @current_level
      while level > @current_level
        result << "<ul>\n<li>\n"
        @current_level += 1
      end
    elsif level < @current_level
      result << "</li>\n"

      while level < @current_level
        result << "</ul>\n</li>\n"
        @current_level -= 1
      end

      result << "<li>\n"
    else
      result << "</li>\n<li>\n"
    end

    result << "<a href=\"##{text.gsub(/\W+/, '-').gsub(/^-|-$/, '').downcase}\">#{text}</a>"

    ""
  end

  def postprocess(text)
    @result.join("")
  end
end

helpers do
  def link_to_page name, url
    path = request.path
    current = path =~ Regexp.new(url)

    if path == '/index.html' and name == 'docs'
      current = true
    end

    class_name = current ? ' class="active"' : ''

    "<li#{class_name}><a href=\"#{url}\">#{name}</a></li>"
  end

  def table_of_contents
    chapters = data.docs.chapters

    chapters = chapters.collect_concat do |file|
      File.read("source/docs/#{file}.md")
    end

    toc = TableOfContents.new()
    markdown = Redcarpet::Markdown.new(toc, fenced_code_blocks: true)
    markdown.render(chapters.join(''))
  end
end

class HighlightedHTML < Redcarpet::Render::HTML
  def header(text, level)
    "<h#{level} id='#{text.gsub(/\W+/, '-').gsub(/^-|-$/, '').downcase}'>#{text}</h#{level}>"
  end

  def block_code(code, language)
    Pygments.highlight(code, :lexer => language)
  end
end

set :md, :layout_engine => :erb,
         :fenced_code_blocks => true,
         :lax_html_blocks => true,
         :renderer => HighlightedHTML.new()

activate :directory_indexes

page "documentation.html" do
  @chapters = data.docs.chapters
end

page "community.html" do
  @chapters = data.community.chapters
end

page "examples/*", :directory_index => false

page "index.html", :proxy => "documentation.html"

# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  # activate :minify_css
  
  # Minify Javascript on build
  # activate :minify_javascript
  
  # Enable cache buster
  # activate :cache_buster
  
  # Use relative URLs
  # activate :relative_assets
  
  # Compress PNGs after build
  # First: gem install middleman-smusher
  # require "middleman-smusher"
  # activate :smusher
  
  # Or use a different image path
  # set :http_path, "/Content/images/"
end
