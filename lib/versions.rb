module Versions
  class << self
    def registered(app)
      app.helpers Helpers
    end
    alias :included :registered
  end

  module Helpers

    def current_version
      require 'open-uri'
      versions = JSON.parse(open('https://guides.emberjs.com/content/versions.json').read)
      @current_version = versions['data']['attributes']['current-version']
    end

    def replace_current_version(input)
      input.gsub("_CURRENT_VERSION_", current_version)
    end
  end
end

::Middleman::Extensions.register(:versions, Versions)
