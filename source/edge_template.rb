# This script is used with the Ruby on Rails' new project generator:
#
#     rails new my_app -m http://emberjs.com/edge_template.rb
#
# For more information about the template API, please see the following Rails
# guide:
#
#     http://edgeguides.rubyonrails.org/rails_application_templates.html

# Install required gems
gem "ember-rails", "~> 0.15"

run "bundle install"

# Configure the app to serve Ember.js and app assets from an AssetsController
generate :controller, "Assets", "index"
run "rm app/views/assets/index.html.erb"
file 'app/views/assets/index.html.erb', <<-CODE
<!DOCTYPE html>
<html>
<head>
  <title>#{@app_name.titleize}</title>
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

remove_file 'app/assets/javascripts/application.js'
generate "ember:bootstrap"

file 'app/assets/javascripts/templates/index.js.handlebars', <<-CODE
<div style="width: 600px; border: 6px solid #eee; margin: 0 auto; padding: 20px; text-align: center; font-family: sans-serif;">
  <img src="http://emberjs.com/images/about/ember-productivity-sm.png" style="display: block; margin: 0 auto;">
  <h1>Welcome to Ember.js!</h1>
  <p>You're running an Ember.js app on top of Ruby on Rails. To get started, replace this content
  (inside <code>app/assets/javascripts/templates/index.js.handlebars</code>) with your application's
  HTML.</p>
</div>
CODE
