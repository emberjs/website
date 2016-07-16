module Versions
  class << self
    def registered(app)
      app.helpers Helpers
    end
    alias :included :registered
  end

  module Helpers

    def current_version
      @current_version = JSON.parse(open('https://raw.githubusercontent.com/emberjs/guides.emberjs.com/master/snapshots/versions.json').read).last
    end
  end
end

::Middleman::Extensions.register(:versions, Versions)
