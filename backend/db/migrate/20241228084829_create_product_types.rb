class CreateProductTypes < ActiveRecord::Migration[8.0]
  def change
    create_table :product_types do |t|
      t.string :name
      t.string :code
      t.timestamps
    end
  end
end
