require 'geocoder'
require 'faraday'

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

  class GroupOrganizer
    attr_reader :data

    def initialize(data)
      @data = data
    end

    def find_organizers

      return if !is_group_on_meetup(data["url"])

      return if has_organizers?

      group_urlname = parse_url_name_from_url(data["url"])
      get_organizers(group_urlname)

    end

    def is_group_on_meetup(url)
      return url.match(/(http:\/\/)*(www.)*meetup.com/)
    end

    def has_organizers?
      data.has_key?("organizers")
    end

    def parse_url_name_from_url(meetup_url)
      urlname = meetup_url.match(/(http:\/\/)*(www.)*meetup.com\/([a-zA-Z-]*)/)
      return urlname.captures[2]
    end

    def get_organizers(meetup_urlname)
      api_key = '7b6b15214f6e154232b7f3c6d417762'

      conn = Faraday.new(:url => 'https://api.meetup.com') do |faraday|
        faraday.request  :url_encoded
        faraday.adapter  Faraday.default_adapter
      end

      group_response = conn.get '/2/groups', { :group_urlname => meetup_urlname, :key => api_key }

      if (group_response.status != 200)
        puts "Unable to get data from meetup.com check you have a valid API key"
        return false
      end

      json = JSON.parse(group_response.body)

      unless (json['results'].empty?)
        results = json['results'][0]
        organizer = results['organizer'].to_hash

        profile_response = conn.get '/2/members', { :member_id => organizer['member_id'], :key => api_key }
        json = JSON.parse(profile_response.body)

        profile = Hash.new
        profile['organizer'] = organizer['name']

        unless (json['results'].empty?)
          results = json['results'][0]
          photo = results['photo'].to_hash

          profile['profileImage'] = photo['thumb_link']

        end

        data["organizers"] = profile
        puts "Found organizer for #{data["location"]}"

      end

    end

    def self.from_hash(data)
      self.new(data)
    end
  end

end