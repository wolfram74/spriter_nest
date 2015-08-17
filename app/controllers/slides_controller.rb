class SlidesController < ApplicationController

  def create
    p "hit route"
    p params
    project = Project.find(params[:project_id])
    location = project.next_spot
    dimension = [project.default_width, project.default_height]
    slide = Slide.new({
      left:location[0], top:location[1], 
      width:dimension[0], height:dimension[1],
      project_id: project.id})

    slide.save
    slide.update_attributes({title: "slide-%d" % slide.id})
    render json: slide.to_json
  end

end
