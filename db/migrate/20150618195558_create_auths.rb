class CreateAuths < ActiveRecord::Migration
  def change
    create_table :auths do |t|
      t.integer :user_id
      t.string :network
      t.string :network_id
      t.timestamps null: false
    end
  end
end
