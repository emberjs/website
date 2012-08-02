require "redcarpet"
require "active_support/core_ext"
require "coderay"

# Debugging
set(:logging, ENV['RACK_ENV'] != 'production')

###
# Blog
###

activate :blog do |blog|
  blog.prefix = "blog"
  blog.layout = "blog_layout"
  blog.summary_separator = %r{(<p>READMORE</p>)} # Markdown adds the <p>
end

###
# Helpers
###

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

helpers do
  # Workaround for content_for not working in nested layouts
  def partial_for(key, partial_name=nil)
    @partial_names ||= {}
    if partial_name
      @partial_names[key] = partial_name
    else
      @partial_names[key]
    end
  end

  def rendered_partial_for(key)
    partial_name = partial_for(key)
    partial(partial_name) if partial_name
  end

  def link_to_page name, url
    path = request.path
    current = path =~ Regexp.new(url)

    if path == '/index.html' and name == 'about'
      current = true
    end

    class_name = current ? ' class="active"' : ''

    "<li#{class_name}><a href=\"#{url}\">#{name}</a></li>"
  end

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

  def highlight(language, class_name, &block)
    concat %Q{<div class="highlight #{class_name} #{language}">}
    concat '<div class="ribbon"></div>'
    code = capture(&block)
    code.gsub!(/^\n+/, '')
    #code.rstrip!
    code = CodeRay.scan(code, language)
    concat code.div css: :class,
                    line_numbers: :table,
                    line_number_anchors: false

    concat %Q{</div>}
  end

  # The default one is buggy as of beta 2
  def wrap_layout(layout_name, &block)
    # Save current buffer for later
    @_out_buf, _buf_was = "", @_out_buf
    begin
      content = capture(&block) if block_given?
    ensure
      # Reset stored buffer
      @_out_buf = _buf_was
    end
    layout_path = locate_layout(layout_name, current_engine)

    if !@_out_buf
      raise "wrap_layout is currently broken for this templating system"
    end

    @_out_buf.concat render_individual_file(layout_path, @current_locs || {}, @current_opts || {}, self) { content }
  end
end

class HighlightedHTML < Redcarpet::Render::HTML
  def header(text, level)
    "<h#{level} id='toc_#{TableOfContents.anchorify(text)}'>#{text}</h#{level}>"
  end

  def block_code(code, language)
    result = %Q{<div class="highlight #{language}">}
    result += '<div class="ribbon"></div>'
    code.gsub!(/^\n+/, '')
    code.rstrip!
    code = CodeRay.scan(code, language)
    result += code.div css: :class,
                    line_numbers: :table,
                    line_number_anchors: false

    result += %Q{</div>}
    result
  end
end

set :markdown_engine, :redcarpet
set :markdown, :layout_engine => :erb,
         :fenced_code_blocks => true,
         :lax_html_blocks => true,
         :renderer => HighlightedHTML.new()

activate :directory_indexes

page "/doc*" do
  @chapters = data.docs.chapters
end 

data.guides.each do |guide_name, properties|
  page "/guides/#{guide_name}", :proxy => "guide.html" do
    @guide = guide_name
  end
end

page "community.html" do
  @chapters = data.community.chapters
end

page "examples/*", :directory_index => false

page "index.html", :proxy => "about.html"

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
