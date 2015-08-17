class SlidesController < ApplicationController

  def create
    p "hit route"
    p params
    project = Project.find(params[:project_id])
    location = project.next_spot
    render json: {"status": "huzzah!"}
  end

end
