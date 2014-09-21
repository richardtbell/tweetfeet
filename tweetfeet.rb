require 'sinatra'
require 'slim'
require 'tweetstream'

TweetStream.configure do |config|
  config.consumer_key       = 'V5Rdm75azw7GEbETrGbkmFnBW'
  config.consumer_secret    = 'vpeBFyIVGNszdy4chinBxXFptlL0YYKdU9p8GAoKvi9MSFBgUx'
  config.oauth_token        = '56434968-6hGxoQmOwnncBAbrKEX4TDU6ILm9mdihZhp8BtSGy'
  config.oauth_token_secret = 'CMYv2oRQRIhFkYifY8UBTnPhF0Ds6Qg5q6dbcu3IaIHgm'
  config.auth_method        = :oauth
end

tweets= Array.new 

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


