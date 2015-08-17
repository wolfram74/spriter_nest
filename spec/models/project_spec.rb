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
      expect(project.to_atlas.keys.length).to eq(3)
    end
    it "information is positioning data" do
      project = FactoryGirl.build(:project)
      3.times do |i|
        project.slides << FactoryGirl.build(:slide,
         title: i.to_s,
         top: 1, left: 3*i, 
         width: 3, height: 4 )
      end
      expect(project.to_atlas["1"].keys.length).to eq(5)
    end
  end

  describe "#next_spot" do
    before(:each) do
      @project = FactoryGirl.build(:project,
        default_width: 11,
        default_height:13)
    end
    it "returns 0-0 for a slideless project" do

      expect(@project.next_spot).to eq([0,0])
    end
    it "returns a different position for a project with slides" do
      @project.slides << FactoryGirl.build(:slide,
         title: 0.to_s,
         top: 0, left: 0, 
         width: 11, height: 13 )
      expect(@project.next_spot).to eq([11,0])
    end
    it "position wraps around for a project with slides on the edge" do
      @project.slides << FactoryGirl.build(:slide,
         title: 0.to_s,
         top: 0, left: 616, 
         width: 11, height: 13 )
      expect(@project.next_spot).to eq([0,13])
    end
    it "position wraps around to the next line if a project covers multiple lines" do
      @project.slides << FactoryGirl.build(:slide,
         title: 0.to_s,
         top: 0, left: 616, 
         width: 11, height: 13 )
      @project.slides << FactoryGirl.build(:slide,
         title: 1.to_s,
         top: 13, left: 616, 
         width: 11, height: 13 )
      expect(@project.next_spot).to eq([0,26])
    end
  end
end
