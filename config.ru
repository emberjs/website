require 'rubygems'
require 'rack-rewrite'

use Rack::Rewrite do
  rewrite /^(.*)\/$/, '$1/index.html'
  r301    /^(.*)\/index.html$/, '$1/'
end
run Rack::Directory.new('.')
