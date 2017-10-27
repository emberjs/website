FROM emberjs/website-dev:latest

# Customizations for this project here.
# e.g.: if you have dependencies in addition to what the base image provides:
ADD Gemfile /src/Gemfile
ADD Gemfile.lock /src/Gemfile.lock
RUN bundle install

ADD . /src
