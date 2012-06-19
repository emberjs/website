# This script is designed to be used with Ruby on Rails' new project generator:
#
#     rails new my_app -m http://emberjs.com/template.rb
#
# For more information about the template API, please see the following Rails
# guide:
#
#     http://edgeguides.rubyonrails.org/rails_application_templates.html

run "rm public/index.html"

# Install required gems
gem "active_model_serializers"
gem_group :assets do
  gem "ember-rails", github: "emberjs/ember-rails"
end

run "bundle install"

# This needs to be done outside the bootstrap generator
# to avoid an initial "unknown variant" error.
environment <<-RUBY.strip_heredoc, :env => :development
  config.ember.variant = :development
RUBY

environment <<-RUBY.strip_heredoc, :env => :test
  config.ember.variant = :development
RUBY

environment <<-RUBY.strip_heredoc, :env => :production
  config.ember.variant = :production
RUBY

# Configure the app to serve Ember.js and app assets from an AssetsController
generate "ember:bootstrap"
generate "ember:install", "--head"
generate :controller, "Assets", "index"
run "rm app/views/assets/index.html.erb"
file 'app/views/assets/index.html.erb', <<-CODE
<!DOCTYPE html>
<html>
<head>
  <title>Photoblog</title>
  <%= stylesheet_link_tag    "application", :media => "all" %>
  <%= csrf_meta_tags %>
</head>
<body>
  <%= javascript_include_tag "application" %>
</body>
</html>
CODE
run "rm -rf app/views/layouts"
route "root :to => 'assets#index'"

# Generate a default serializer that is compatible with ember-data
generate :serializer, "application", "--parent", "ActiveModel::Serializer"
inject_into_class "app/serializers/application_serializer.rb", 'ApplicationSerializer' do
  "  embed :ids, :include => true\n"
end

