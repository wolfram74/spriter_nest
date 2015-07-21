require 'rails_helper'

RSpec.describe Slide, type: :model do
  describe "associations" do
    it {should belong_to(:project)}
  end
end
