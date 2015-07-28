class AddTitleToSlide < ActiveRecord::Migration
  def change
    add_column :slides, :title, :string
  end
end
