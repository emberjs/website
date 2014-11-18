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

activate :directory_indexes
activate :toc
activate :highlighter
activate :alias
activate :ember do |config|
  config.templates_root = 'app/builds/templates'
end

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

###
# Build
###

configure :build do
  activate :minify_css
  activate :minify_javascript, ignore: /.*examples.*js/
end

###
# Blog
###

activate :blog do |blog|
  blog.prefix = 'blog'
  blog.layout = 'layouts/blog'
  blog.tag_template = 'blog/tag.html'
end

page '/blog/feed.xml', layout: false

###
# Pages
###

page 'guides*', layout: :guide do
  @guides = data.guides
end

page 'community.html'

page 'index.html', proxy: 'about.html'

page '404.html', directory_index: false

# Don't build layouts standalone
ignore '*_layout.erb'

# Don't build API layouts
ignore 'api/class.html.erb'
ignore 'api/module.html.erb'

# Don't build templates for example apps because they are embedded in other JS
ignore 'javascripts/app/examples/*/templates/*'

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

  def page_classes
    classes = super
    return 'not-found' if classes == '404'
    classes
  end

  def load_example_files
    root = Pathname(__FILE__).join('../source/javascripts/app/examples')
    all_files = Hash.new {|hash, key| hash[key] = [] }

    Dir[root.join('**/*.*').to_s].each do |path|
      relative_path = Pathname(path).relative_path_from(root)
      match_data = relative_path.to_s.match(%r{^([^/]+)/(.+)$})
      name = match_data[1]
      file = match_data[2]

      all_files[name] << {name: file, contents: File.read(path)}
    end

    all_files
  end
end
