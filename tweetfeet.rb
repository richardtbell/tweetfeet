require 'sinatra'
require 'slim'

  get '/' do
    slim :index
  end

  get '/stylesheets/*.css' do
    content_type 'text/css', :charset => 'utf-8'
    filename = params[:splat].first
    sass filename.to_sym, :views => settings.root + "/assets/stylesheets"
  end

  get '/javascripts/*.js' do
    content_type 'application/javascript', :charset => 'utf-8'
    filename = params[:splat].first
    send_file settings.root + "/assets/javascripts/" + filename + ".js"
  end

  get '/vendor/stylesheets/*.css' do
    content_type 'text/css', :charset => 'utf-8'
    filename = params[:splat].first
    send_file settings.root + "/vendor/stylesheets/" + filename + ".css"
  end

    get '/vendor/javascripts/*.js' do
    content_type 'application/javascript', :charset => 'utf-8'
    filename = params[:splat].first
    send_file settings.root + "/vendor/javascripts/" + filename + ".js"
  end