require "test_helper"

class Api::V1::VariantsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_variants_index_url
    assert_response :success
  end

  test "should get _form" do
    get api_v1_variants__form_url
    assert_response :success
  end

  test "should get new" do
    get api_v1_variants_new_url
    assert_response :success
  end

  test "should get create" do
    get api_v1_variants_create_url
    assert_response :success
  end

  test "should get edit" do
    get api_v1_variants_edit_url
    assert_response :success
  end

  test "should get update" do
    get api_v1_variants_update_url
    assert_response :success
  end

  test "should get destroy" do
    get api_v1_variants_destroy_url
    assert_response :success
  end

  test "should get show" do
    get api_v1_variants_show_url
    assert_response :success
  end
end
