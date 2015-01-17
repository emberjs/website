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
    attr_reader :api_key
    attr_reader :meetup_connection

    def initialize(data)
      @data = data
      @meetup_connection = Faraday.new(:url => 'https://api.meetup.com') do |faraday|
        faraday.request  :url_encoded
        faraday.adapter  Faraday.default_adapter
      end
    end

    def find_organizers(update_all)

      return if !is_group_on_meetup(data["url"])

      if(update_all || !has_organizers?)
        group_urlname = parse_url_name_from_url(data["url"])
        get_organizers(group_urlname)
      end

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
      group_response = meetup_connection.get '/2/groups', { :group_urlname => meetup_urlname, :key => ENV["MEETUP_API_KEY"] }
      assert_ok(group_response)
    end

    def meetup_connection
      Faraday.new(:url => 'https://api.meetup.com') do |faraday|
        faraday.request  :url_encoded
        faraday.adapter  Faraday.default_adapter
      end
    end

    def get_member_data(organizer)
      member_response = meetup_connection.get '/2/members', { :member_id => organizer['member_id'], :key => ENV["MEETUP_API_KEY"] }
      assert_member_ok(organizer['name'], member_response)
    end

    def assert_ok(response)
      if response.status != 200
        puts "Unable to get data group from meetup.com"
        return false
      end

      json = JSON.parse(response.body)

      unless json['results'].empty?
        data["organizers"] =  Array.new
        get_member_data(json['results'][0]['organizer'])
      end
    end

    def assert_member_ok(member_name, response)

      if response.status != 200
        puts "Unable to get member from meetup.com"
      end

      json_member = JSON.parse(response.body)

      profile = {}
      profile['organizer'] = member_name

      if photo = json_member['results'].first
        profile['profileImage'] = photo['photo']['thumb_link']
      end

      data["organizers"] << profile
      puts "Found organizer for #{data["location"]}"

    end

    def self.from_hash(data)
      self.new(data)
    end
  end

end