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
      versions = JSON.parse(open('https://raw.githubusercontent.com/emberjs/guides.emberjs.com/master/snapshots/versions.json').read)
      versions.sort_by! { |version| Gem::Version.new(version[1..-1]) }
      @current_version = versions.last
    end

    def replace_current_version(input)
      input.gsub("_CURRENT_VERSION_", current_version)
    end
  end
end

::Middleman::Extensions.register(:versions, Versions)
