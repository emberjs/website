require 'geocoder'

module MeetupsData
  class GroupGeocoder
    attr_reader :data

    def initialize(data)
      @data = data
    end

    def find_location
      return if has_coordinates?
      coord = geocode(address) || geocode(location)
      if coord.nil?
        yield "Unable to find coordinates for #{data["location"]}" if block_given?
        return
      end
      data["lat"] = coord[0]
      data["lng"] = coord[1]
      yield "Found coordinates for #{data["location"]}" if block_given?
      #throttle requests to API to avoid errors
      sleep 0.1
    end

    def geocode(place_name)
      return nil if place_name.nil?
      Geocoder.coordinates(place_name)
    end

    def has_coordinates?
      data.has_key?("lng") and data.has_key?("lat")
    end

    def address
      data["address"]
    end

    def location
      data["location"]
    end

    def location_text
      Geocoder.coordinates(data["address"]) || Geocoder.coordinates(data["location"])
    end

    def self.from_hash(data)
      self.new(data)
    end
  end
end