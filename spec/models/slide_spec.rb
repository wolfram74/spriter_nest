require 'rails_helper'

RSpec.describe Slide, type: :model do
  describe "associations" do
    it {should belong_to(:project)}
  end
  describe "#to_atlas" do
    it "renders a hash containing positioning data" do
      slide = FactoryGirl.build(:slide, top: 1, left: 2, width: 3, height: 4)
      expect(slide.to_atlas.keys.length).to equal(4)
    end
  end
end
