class ProjectsController < ApplicationController
  def create

  end

  def index
    user = User.find(params[:user_id])
    render json: user.projects
  end

  def show
    project = Project.find(params[:id])
    output = {project: project, sprite_atlas: project.to_atlas}
    render json: output
  end

  def destroy

  end
end
