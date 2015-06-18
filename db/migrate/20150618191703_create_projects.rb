class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :title
      t.integer :user_id
      t.integer :default_width
      t.integer :default_height
      t.integer :color_depth
      t.timestamps null: false
    end
  end
end
