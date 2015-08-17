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

  def next_spot
    # 630*630 -> 396900, bit under 4E5
    return [0,0] if self.slides.empty?
    sorted_slides = self.slides.sort_by{|slide| slide.left}
    leftmost_slides = sorted_slides.select{|slide| slide.left==sorted_slides[-1].left}
    last_slide = leftmost_slides.sort_by{|slide| slide.top}[-1]
    last_spot = [last_slide.left, last_slide.top]
    spot = [last_spot[0]+self.default_width,last_spot[1]]
    if spot[0]+self.default_width > 630
      spot[0] = 0
      spot[1]+= self.default_height
    end
    return spot
  end
end