class UsersController < ApplicationController
  def create
    p params
    User.auth_parse(params)
    render json: {data: "fart noises"}
  end

  def show

  end  

  def update

  end
end
