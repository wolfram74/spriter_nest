class Project < ActiveRecord::Base
  has_many :slides
  belongs_to :user

  def to_atlas
    output = {user_id: self.user_id, imgur_id: self.imgur_id}
    self.slides.each{|slide| output[slide.title] = slide.to_atlas}
    return output
  end
end
