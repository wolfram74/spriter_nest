require 'rails_helper'

RSpec.describe User, type: :model do
  describe "associations" do
    it {should have_many(:auths)}
    it {should have_many(:projects)}
  end

  describe "#auth_parse" do
    context "encounters new names" do
      before(:each) do
        @args = {
          account_username:"bob",
          access_token:"5",
          refresh_token:"poot"
        }

      end
      it "creates new users" do
        expect{User.auth_parse(@args)}.to change{User.count}
      end

      it "creates new auths" do
        expect{User.auth_parse(@args)}.to change{Auth.count}
      end
    end
    context "encounters old names" do
      before(:each) do
        @user = FactoryGirl.create(:user, name: "bob")
        @auth = FactoryGirl.create(:auth, access_token: "4", refresh_token: "fart")
        @user.auths << @auth
        @args = {
          account_username:"bob",
          access_token:"5",
          refresh_token:"poot"
        }
      end
      it "creates no new users" do
        expect{User.auth_parse(@args)}.to_not change{User.count}
      end

      it "updates related auth" do
        expect{User.auth_parse(@args); @auth.reload()}.to change{@user.auths[0].updated_at}        
      end

    end
  end
end
