require "dalli"
require "rack"
require "rack/cache"

class Static
  def initialize
    @file_server = Rack::File.new(File.expand_path("../output", __FILE__))
  end

  def call(env)
    path = env["PATH_INFO"]

    case path
    when "/"
      env["PATH_INFO"] = "/index.html"
      call(env)
    else
      @file_server.call(env)
    end
  end
end

if ENV["RACK_ENV"] == "development"
  require "rake-pipeline"
  require "rake-pipeline/middleware"
  use Rake::Pipeline::Middleware, "Assetfile"
end

$cache = Dalli::Client.new
use Rack::Cache, :metastore => $cache, :entitystore => 'file:tmp/cache/entity'
run Static.new
