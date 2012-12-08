require "bundler/setup"

def git_initialize(repository)
  unless File.exist?(".git")
    system "git init"
    system "git remote add origin https://github.com/emberjs/#{repository}.git"
  end
end

def git_update
  system "git fetch origin"
  system "git reset --hard origin/master"
end

def ember_path
  File.expand_path(ENV['EMBER_PATH'] || File.expand_path("../../ember.js", __FILE__))
end

def generate_docs
  print "Generating docs data from #{ember_path}... "

  sha = nil

  Dir.chdir(ember_path) do
    # returns either `tag` or `tag-numcommits-gSHA`
    describe = `git describe --tags --always`.strip
    sha = describe =~ /-g(\.+)/ ? $1 : describe

    Dir.chdir("docs") do
      system("npm install") unless File.exist?('node_modules')
      # Unfortunately -q doesn't always work so we get output
      system("./node_modules/.bin/yuidoc -p -q")
    end
  end

  # JSON is valid YAML
  data = YAML.load_file(File.join(ember_path, "docs/build/data.json"))
  data["project"]["sha"] = sha
  File.open(File.expand_path("../data/api.yml", __FILE__), "w") do |f|
    YAML.dump(data, f)
  end

  puts "Built #{sha}"
end

def build
  system "middleman build"
end

desc "Generate API Docs"
task :generate_docs do
  generate_docs
end

desc "Build the website"
task :build => :generate_docs do
  build
end

desc "Preview"
task :preview do
  require 'listen'

  generate_docs

  paths = Dir.glob(File.join(ember_path, "packages/*/lib"))
  listener = Listen.to(*paths, :filter => /\.js$/)
  listener.change { generate_docs }
  listener.start(false)

  system "middleman server"
end

=begin
namespace :examples do

  desc "Update the included examples from the separate examples repository"
  task :update do
    mkdir_p "source/examples"
    Dir.chdir "source/examples" do
      git_initialize("examples")
      git_update
      `ls .git`
      FileUtils.rm_rf(".git")
    end
  end

end
=end

desc "Deploy the website to github pages"
task :deploy do |t, args|
  require "highline/import"
  message = ask("Provide a deployment message:  ") do |q|
    q.validate = /\w/
    q.responses[:not_valid] = "Can't be empty."
  end

  mkdir_p "build"
  Dir.chdir "build" do
    git_initialize("emberjs.github.com")
    git_update

    build

    # This screws up the build and isn't necessary
    # rm_r "source/examples"

    File.open("CNAME", 'w') do |f|
      f.write "emberjs.com"
    end

    system "git add -A"
    system "git commit -m '#{message.gsub("'", "\\'")}'"
    system "git push origin master" unless ENV['NODEPLOY']
  end
end
