class CreateSubCategories < ActiveRecord::Migration[8.0]
  def change
    create_table :sub_categories do |t|
      t.timestamps
    end
  end
end
