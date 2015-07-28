require 'rails_helper'

RSpec.describe Project, type: :model do
  describe "associations" do
    it {should belong_to(:user)}
    it {should have_many(:slides)}
  end

  describe "#to_atlas" do
    it "renders a hash containing information for each slide" do
      project = FactoryGirl.build(:project)
      3.times do |i|
        project.slides << FactoryGirl.build(:slide,
         title: i.to_s,
         top: 1, left: 3*i, 
         width: 3, height: 4 )
      end
      expect(project.to_atlas.keys.length).to equal(3)
    end
    it "information is positioning data" do
      project = FactoryGirl.build(:project)
      3.times do |i|
        project.slides << FactoryGirl.build(:slide,
         title: i.to_s,
         top: 1, left: 3*i, 
         width: 3, height: 4 )
      end
      expect(project.to_atlas["1"].keys.length).to equal(3)
    end
  end
end
