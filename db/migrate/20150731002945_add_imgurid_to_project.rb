class AddImguridToProject < ActiveRecord::Migration
  def change
    add_column :projects, :imgur_id, :string
  end
end
