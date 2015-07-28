class AddAccessTokenToAuth < ActiveRecord::Migration
  def change
    add_column :auths, :access_token, :string
  end
end
