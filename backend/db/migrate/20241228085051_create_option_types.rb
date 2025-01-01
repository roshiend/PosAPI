class CreateOptionTypes < ActiveRecord::Migration[8.0]
  def change
    create_table :option_types do |t|
      t.string :name
      t.string :values,null: false,array: true, default: []
      t.integer :position 
      t.references :product, foreign_key: true,null: false
      t.timestamps
    end
  end
end
