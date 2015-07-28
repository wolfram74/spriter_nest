class AuthsController < ApplicationController
  def create

  end

  def show

  end  

  def update
    #  post route to https://api.imgur.com/oauth2/token
    # needs refresh_token, client_id, 
    # client_secret, grant_type = "bearer"
    auth = Auth.find(params[:id])
    data = {refresh_token: auth, grant_type: "bearer"}
    data[:client_id] = Figaro.env.imgur_client_id
    data[:client_secret] = Figaro.env.imgur_client_secret
    response = HTTParty.post("https://api.imgur.com/oauth2/token", :query => data)
    auth.access_token = response.access_token
    auth.refresh_token = response.refresh_token
    auth.save
    render json: auth
  end

end
