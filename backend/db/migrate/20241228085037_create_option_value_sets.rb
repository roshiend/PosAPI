class CreateOptionValueSets < ActiveRecord::Migration[8.0]
  def change
    create_table :option_value_sets do |t|
      t.timestamps
    end
  end
end
