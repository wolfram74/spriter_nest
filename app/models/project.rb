class Project < ActiveRecord::Base
  has_many :slides
  belongs_to :user

  def sprite_atlas
    self.to_atlas
  end

  def to_atlas
    output = {}
    self.slides.each{|slide| output[slide.title] = slide.to_atlas}
    return output
  end
end