class CreateVendors < ActiveRecord::Migration[8.0]
  def change
    create_table :vendors do |t|
      t.string :name
      t.string :code
      t.timestamps
    end
  end
end
