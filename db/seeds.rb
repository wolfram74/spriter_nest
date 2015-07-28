# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
user = User.find_by(name: "wolfram074")

project = {
  title: "mario test",
  user_id: user.id,
  default_width:17,
  default_height:21,
  color_depth: 256
}
project = Project.create(project)
top = 9
left = 12
slides = []
4.times do |i|
  params = {
    title: "slide-%02d" % i,
    width: 17,
    height: 21,
    top: top,
    left: left + 17*i
  }
  project.slides << Slide.create(params)
end
p project.slides