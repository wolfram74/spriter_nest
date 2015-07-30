class UsersController < ApplicationController
  def create
    p params
    user = User.auth_parse(params)
    render json: user
  end

  def show

  end  

  def update

  end
end
