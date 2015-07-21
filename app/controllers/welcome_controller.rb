class WelcomeController < ApplicationController
  def index
    p params
  end

  def new
    client_id = Figaro.env.imgur_client_id
    response_type = "token"
    state = "authenticated"
    access_params = [client_id, response_type, state]
    @access_url = "https://api.imgur.com/oauth2/authorize?client_id=%s&response_type=%s&state=%s" % access_params
  end

end
