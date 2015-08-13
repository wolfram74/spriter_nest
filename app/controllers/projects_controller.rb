class ProjectsController < ApplicationController
  def create

  end

  def index
    user = User.find(params[:user_id])
    render json: user.projects
  end

  def show
    p "hit route"
    project = Project.includes(:slides).find(params[:id])

    # output = {project: project, sprite_atlas: project.to_atlas}
    p project.to_json(methods: [:atlas])
    render json: project.to_json(methods: [:sprite_atlas])
  end

  def destroy

  end
end
