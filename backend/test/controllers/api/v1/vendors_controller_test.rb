require "test_helper"

class Api::V1::VendorsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_vendors_index_url
    assert_response :success
  end

  test "should get _form" do
    get api_v1_vendors__form_url
    assert_response :success
  end

  test "should get new" do
    get api_v1_vendors_new_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_vendors_create_url
    assert_response :success
  end

  test "should get edit" do
    get api_v1_vendors_edit_url
    assert_response :success
  end

  test "should get update" do
    get api_v1_vendors_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_vendors_destroy_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_vendors_show_url
    assert_response :success
  end
end
