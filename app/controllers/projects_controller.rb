class ProjectsController < ApplicationController
  def create

  end

  def index
    user = User.find(params[:user_id])
    render json: user.projects
  end

  def show

  end  

  def destroy

  end
end
