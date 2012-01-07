require "bundler/setup"

desc "Build the website"
task :build do
  system "middleman build"
end

desc "Deploy the website to github pages"
task :deploy => :build do |t, args|
  require "highline/import"
  message = ask("Provide a deployment message:  ") do |q|
    q.validate = /\w/
    q.responses[:not_valid] = "Can't be empty."
  end

  Dir.chdir "output" do
    unless File.exist?(".git")
      system "git init"
      system "git remote add origin git@github.com:emberjs/emberjs.github.com.git"
    end
    system "git add -A"
    system "git commit -m '#{message.gsub("'", "\\'")}'"
    system "git push origin master"
  end
end
