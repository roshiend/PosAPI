class CreateOptionTypes < ActiveRecord::Migration[8.0]
  def change
    create_table :option_types do |t|
      t.timestamps
    end
  end
end
