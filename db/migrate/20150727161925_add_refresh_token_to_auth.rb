class AddRefreshTokenToAuth < ActiveRecord::Migration
  def change
    add_column :auths, :refresh_token, :string
  end
end
