require "bundler/setup"

desc "Build the website"
task :build do
  system "middleman build"
end

desc "Deploy the website to github pages"
task :deploy do |t, args|
  require "highline/import"
  message = ask("Provide a deployment message:  ") do |q|
    q.validate = /\w/
    q.responses[:not_valid] = "Can't be empty."
  end

  mkdir_p "build"
  Dir.chdir "build" do
    unless File.exist?(".git")
      system "git init"
      system "git remote add origin git@github.com:emberjs/emberjs.github.com.git"
    end
    system "git pull origin master"
    system "git reset --hard origin/master"

    Rake::Task["build"].invoke

    system "git add -A"
    system "git commit -m '#{message.gsub("'", "\\'")}'"
    system "git push origin master" unless ENV['NODEPLOY']
  end
end
