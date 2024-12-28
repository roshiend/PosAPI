class CreateOptionTypeSets < ActiveRecord::Migration[8.0]
  def change
    create_table :option_type_sets do |t|
      t.timestamps
    end
  end
end
