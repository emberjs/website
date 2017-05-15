module Sponsors
  class << self
    def registered(app)
      app.helpers Helpers
    end
    alias :included :registered
  end

  module Helpers

    def sponsors
      @sponsors ||= data.sponsors.map do |sponsor|
        Sponsor.new(sponsor)
      end
    end

    def current_sponsors
      @current_sponsors ||= sponsors.select(&:current?).sort_by { |s| [s.term_start, s.url] }
    end

    def past_sponsors
      @past_sponsors ||= sponsors.reject(&:current?).sort_by { |s| [s.term_end, s.url] }.reverse
    end
  end

  class Sponsor

    def initialize(data)
      @source = data
    end

    def current?
      !term_end || term_end > Time.now
    end

    def term_length
      (term_end || Time.now.to_date) - term_start
    end

    def term
      if current?
        "#{term_start.year}–present"
      elsif term_start.year == term_end.year
        term_start.year
      else
        "#{term_start.year}–#{term_end.year}"
      end
    end

    private

    def method_missing(meth)
      @source.send(meth)
    end

  end
end

::Middleman::Extensions.register(:sponsors, Sponsors)
