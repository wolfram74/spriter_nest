require 'rails_helper'

FactoryGirl.factories.map(&:name).each do |factory_name|
  describe "The #{factory_name} factory", {type: :meta} do
     it 'is valid' do
      built = FactoryGirl.build(factory_name)
      if !built.valid?
        p built.errors
      end
      expect(built.valid?).to be(true)
     end
  end
end