class CreateSlides < ActiveRecord::Migration
  def change
    create_table :slides do |t|
      t.integer :project_id
      t.integer :width
      t.integer :height
      t.integer :left
      t.integer :top

      t.timestamps null: false
    end
  end
end
