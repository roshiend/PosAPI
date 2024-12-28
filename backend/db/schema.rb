# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2024_12_28_085125) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string "value"
    t.string "code"
    t.bigint "product_type_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_type_id"], name: "index_categories_on_product_type_id"
  end

  create_table "listing_types", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "option_type_sets", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "option_types", force: :cascade do |t|
    t.string "name"
    t.string "value", default: [], null: false, array: true
    t.integer "position"
    t.bigint "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_option_types_on_product_id"
  end

  create_table "option_value_sets", force: :cascade do |t|
    t.string "value"
    t.bigint "option_type_set_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["option_type_set_id"], name: "index_option_value_sets_on_option_type_set_id"
  end

  create_table "product_types", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "sub_category_id"
    t.decimal "master_price", precision: 10, scale: 2
    t.bigint "vendor_id", null: false
    t.bigint "product_type_id", null: false
    t.bigint "shop_location_id", null: false
    t.bigint "category_id", null: false
    t.bigint "listing_type_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_products_on_category_id"
    t.index ["listing_type_id"], name: "index_products_on_listing_type_id"
    t.index ["product_type_id"], name: "index_products_on_product_type_id"
    t.index ["shop_location_id"], name: "index_products_on_shop_location_id"
    t.index ["vendor_id"], name: "index_products_on_vendor_id"
  end

  create_table "shop_locations", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "sub_categories", force: :cascade do |t|
    t.string "value"
    t.string "code"
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_sub_categories_on_category_id"
  end

  create_table "variants", force: :cascade do |t|
    t.string "sku"
    t.string "option1"
    t.string "option2"
    t.string "option3"
    t.decimal "price", precision: 10, scale: 2
    t.string "title"
    t.string "unique_id"
    t.string "barcode"
    t.integer "position"
    t.bigint "product_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_variants_on_product_id"
  end

  create_table "vendors", force: :cascade do |t|
    t.string "name"
    t.string "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "categories", "product_types"
  add_foreign_key "option_types", "products"
  add_foreign_key "option_value_sets", "option_type_sets"
  add_foreign_key "products", "categories"
  add_foreign_key "products", "listing_types"
  add_foreign_key "products", "product_types"
  add_foreign_key "products", "shop_locations"
  add_foreign_key "products", "vendors"
  add_foreign_key "sub_categories", "categories"
  add_foreign_key "variants", "products"
end
