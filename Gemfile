source 'https://rubygems.org'

gem "redcarpet"
gem "activesupport"
gem "highline"
gem "rake"
gem "coderay", :git => "git://github.com/dgeb/coderay.git", :branch => "handlebars"
gem "middleman", '~> 3.0'
gem "middleman-blog", "~> 3.0"
gem "thin"
gem "rack"
gem "listen"
gem "builder"
gem "middleman-alias", github: "wagenet/middleman-alias", branch: "keep-search-and-hash"
gem "ember-middleman"
gem "underscore-rails"
gem "gmaps4rails"
gem "geocoder"
gem "faraday"

source 'https://rails-assets.org' do
  gem "rails-assets-js-md5"
  gem "rails-assets-moment"
end

group :development, :test do
  gem 'pry'
  gem 'pry-byebug'
end

group :test do
  gem "rspec"
  gem "capybara"
  gem "poltergeist"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin]
gem 'wdm', '>= 0.1.0', platforms: [:mingw, :mswin]
