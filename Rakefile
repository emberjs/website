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

desc "Build the website"
task :build do
  system "middleman build"
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

    Rake::Task["build"].invoke

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
