class Slide < ActiveRecord::Base
  belongs_to :project

  def to_atlas
    {top: self.top, left: self.left, 
      width: self.width, height: self.height}
  end
end
