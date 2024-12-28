class CreateShopLocations < ActiveRecord::Migration[8.0]
  def change
    create_table :shop_locations do |t|
      t.timestamps
    end
  end
end
