module Versions
  class << self
    def registered(app)
      app.helpers Helpers
    end
    alias :included :registered
  end

  module Helpers

    def current_version
      require 'yaml'
      require 'open-uri'
      @current_version = YAML.parse(open('https://raw.githubusercontent.com/ember-learn/guides-source/master/versions.yml')).to_ruby['currentVersion']
    end

    def replace_current_version(input)
      input.gsub("_CURRENT_VERSION_", current_version)
    end
  end
end

::Middleman::Extensions.register(:versions, Versions)
