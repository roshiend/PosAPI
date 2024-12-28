class CreateListingTypes < ActiveRecord::Migration[8.0]
  def change
    create_table :listing_types do |t|
      t.timestamps
    end
  end
end
