class ProjectsController < ApplicationController
  def create

  end

  def index
    user = User.find(params[:user_id])
    render json: user.projects
  end

  def show
    project = Project.includes(:slides).find(params[:id])

    # output = {project: project, sprite_atlas: project.to_atlas}
    p project.to_json(methods: [:atlas])
    render json: project.to_json(methods: [:sprite_atlas])
  end

  def update
    p params
    project = Project.find(params[:id])
    old_imgur_id = project.imgur_id
    project.update_attributes({imgur_id: params[:newID]})
    render json: {oldImgurID: old_imgur_id}
  end

  def destroy

  end
end
