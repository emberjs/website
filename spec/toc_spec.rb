#NOTE: start the middleman as in readme, then run bundle exec rspec

require 'capybara/rspec'
require 'capybara/poltergeist'
require 'pry'

unless `which phantomjs`.empty?
  Capybara.register_driver :poltergeist do |app|
    Capybara::Poltergeist::Driver.new(app, { :inspector => true, })
  end
  Capybara.javascript_driver = :poltergeist
end

describe "TOC", :type => :feature do
  include Capybara::DSL

  before do
    Capybara.app_host = 'http://localhost:4567'
    unless `which phantomjs`.empty?
      Capybara.current_driver = :poltergeist
    else
      Capybara.current_driver = :selenium
    end
    Capybara.run_server = false
  end

  it "Within-guide page link" do
    visit "/guides/models/finding-records"
    find('a.next-guide').text.should =~ /Working with Records/
  end

  it "Another within-guide page link " do
    visit "/guides/object-model/bindings"
    find('a.next-guide').text.should =~ /Reopening Classes and Instances/
  end

  it "Shows next section link" do
    visit "/guides/views/manually-managing-view-hierarchy"
    find('a.next-guide').text.should =~ /We're done with Views/
    find('a.next-guide').text.should =~ /Next up: /
    find('a.next-guide').text.should =~ /Enumerables/
    find('a.next-guide').text.should =~ /Introduction/
  end

  it "Shows previous section link" do
    visit "/guides/routing"
    find('a.previous-guide').text.should =~ /Templates: Writing Helpers/
  end

  it "Chills on the first page" do
    visit "/guides/index.html"
    page.should_not have_css('a.previous-guide')
  end

  it "First page should have a link to the first guide" do
    visit "/guides/index.html"
    find('a.next-guide').text.should =~ /Getting Started/
  end

  it "Chills on the last page" do
    visit "/guides/contributing/adding-new-features"
    page.should_not have_css('a.next-guide')
  end
end
