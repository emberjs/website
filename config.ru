require 'rubygems'
require 'rack-rewrite'

use Rack::Rewrite do
  rewrite /^(.*)\/$/, '$1/index.html'
  r301    /^(.*)\/index.html$/, '$1/'
end

forbidden = proc do
  body = "Forbidden\n"
  size = Rack::Utils.bytesize(body)
  [403, {"Content-Type" => "text/plain",
    "Content-Length" => size.to_s,
    "X-Cascade" => "pass"}, [body]]
end

%w(config.ru Gemfile Gemfile.lock specs).each do |file|
  map("/#{file}"){ run forbidden }
end

map "/" do
  run Rack::Directory.new('.')
end
