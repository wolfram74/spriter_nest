class ProjectsController < ApplicationController
  def create
    p params
    p "hit route"
    user = User.find(params[:user_id])
    project = user.projects.create({
      default_width: params[:defaultWidth],
      default_height: params[:defaultHeight],
      title: params[:title],
      })
    p project.to_json
    render json: {totes: "magoats"}
  end

  def index
    user = User.find(params[:user_id])
    render json: user.projects
  end

  def show
    project = Project.includes(:slides).find(params[:id])
    # output = {project: project, sprite_atlas: project.to_atlas}
    render json: project.to_json(methods: [:sprite_atlas])
  end

  def update
    project = Project.find(params[:id])
    old_imgur_id = project.imgur_id
    project.update_attributes({imgur_id: params[:newID]})
    render json: {oldImgurID: old_imgur_id}
  end

  def destroy

  end
end
