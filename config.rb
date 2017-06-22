require 'redcarpet'
require 'active_support'
require 'active_support/core_ext'

Dir['./lib/*'].each { |f| require f }

# Debugging
set(:logging, ENV['RACK_ENV'] != 'production')

set :markdown_engine, :redcarpet
set :markdown, :layout_engine => :erb,
         :fenced_code_blocks => true,
         :lax_html_blocks => true,
         :renderer => Highlighter::HighlightedHTML.new

activate :asset_hash, :ignore => [/^sw/]
activate :directory_indexes
activate :toc
activate :sponsors
activate :highlighter
activate :column_balancer
activate :versions

activate :api_docs,
  ember: {
    name: "Ember",
    default_class: "Ember",
    root: "api",
    data: "api",
    repo_url: 'https://github.com/emberjs/ember.js'
  },
  data: {
    name: "Ember Data",
    default_class: "DS",
    root: "api/data",
    data: "data_api",
    repo_url: "https://github.com/emberjs/data"
  }

activate :internal_api_docs,
  ember: {
    name: "Ember",
    default_class: "Ember",
    root: "internal",
    data: "api",
    repo_url: 'https://github.com/emberjs/ember.js'
  },
  data: {
    name: "Ember Data",
    default_class: "DS",
    root: "internal/data",
    data: "data_api",
    repo_url: "https://github.com/emberjs/data"
  }

###
# Build
###

configure :build do
  activate :minify_css
  activate :minify_javascript
end

###
# Blog
###

activate :blog do |blog|
  blog.prefix = 'blog'
  blog.layout = 'layouts/blog'
  blog.tag_template = 'blog/tag.html'

  blog.paginate = true
  blog.page_link = "page/{num}"
  blog.per_page = 10
end

page '/blog/feed.xml', layout: false

###
# Pages
###

page 'guides*', layout: :guide

page 'community.html'

page 'index.html', proxy: 'about.html'

page '404.html', directory_index: false

# Don't build layouts standalone
ignore '*_layout.erb'

# Don't build API layouts
ignore 'api/class.html.erb'
ignore 'api/module.html.erb'
ignore 'internal_api/class.html.erb'
ignore 'internal_api/module.html.erb'

###
# Builds
###
['release', 'beta', 'canary', 'tagged'].each do |tab|
  proxy "/builds/#{tab}.html", '/builds/index.html'
end

###
# Helpers
###

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
    current = path =~ Regexp.new('^' + url[1..-1] + '.*\.html')

    if path == 'index.html' and name == 'about'
      current = true
    end

    class_name = current ? ' class="active"' : ''

    "<li#{class_name}><a href=\"#{url}\">#{name}</a></li>"
  end

  def page_classes(page)
    classes = super
    return 'not-found' if classes == '404'

    if page.responsive
      classes += ' responsive'
    else
      classes += ' not-responsive'
    end

    classes.gsub('internal', 'api')
  end
end

###
# Redirects (These must be last!)
###

activate :alias
