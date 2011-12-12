unless ENV['RACK_ENV'] == 'production'
  puts "For use on Heroku only. For development run `bundle exec rakep`"
  abort
end

require 'rubygems'
require 'rack-rewrite'

use Rack::Rewrite do
  rewrite /^(.*)\/$/, '$1/index.html'
  r301    /^(.*)\/index.html$/, '$1/'
end

run Rack::Directory.new('./output')
