#NOTE: start the middleman as in readme, then run bundle exec rspec

require 'capybara/rspec'
require 'capybara/poltergeist'

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
      Capybara.current_driver = :selemium
    end
    Capybara.run_server = false
  end

  it "Within-guide page link" do
    visit "/guides/models/finding-models"
    find('a.next-guide').text.should =~ /Modifying Attributes/
  end

  it "Another within-guide page link " do
    visit "/guides/object-model/bindings"
    find('a.next-guide').text.should =~ /Reopening Classes and Instances/
  end

  it "Shows next section link" do
    visit "/guides/views/manually-managing-view-hierarchy"
    find('a.next-guide').text.should =~ /We're done with Views/
    find('a.next-guide').text.should =~ /The Object Model/
    find('a.next-guide').text.should =~ /Classes and Instances/
  end

  it "Shows previous section link" do
    visit "/guides/routing"
    find('a.previous-guide').text.should =~ /Templates: Writing Helpers/
  end

  it "Chills on the first page" do
    # Note: "/guides/concepts/core-concepts" isn't the first page
    visit "/guides/index.html"
    page.should_not have_css('a.previous-guide')
  end

  it "First page should have a link to the first guide" do
    visit "/guides/index.html"
    find('a.next-guide').text.should =~ /Core Concepts/
  end

  it "Chills on the last page" do
    visit "/guides/understanding-ember/keeping-templates-up-to-date"
    page.should_not have_css('a.next-guide')
  end

  it "should have an ember-data warning on model pages but not on other pages" do
    visit "/guides/models"
    find('.under_construction_warning').text.should =~
        /WARNING: EMBER-DATA IS A WORK IN PROGRESS AND UNDER RAPID DEVELOPMENT. USE WITH CAUTION!!!/
    visit "/guides/views"
    page.should_not have_css('.under_construction_warning')
  end

end
