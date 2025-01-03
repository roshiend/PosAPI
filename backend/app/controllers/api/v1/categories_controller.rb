class Api::V1::CategoriesController < ApplicationController
  before_action :set_category, only: %i[ show edit update destroy ]

  # GET /categories or /categories.json
  def index
    @categories = Category.all
    render json: @categories, include: { sub_categories: {} }
  end

  # GET /categories/1 or /categories/1.json
  def show
    render json: @category, status: :ok
  end

  # GET /categories/new
  def new
    @category = Category.new
  end

  # GET /categories/1/edit
  def edit
  end

  def sub_categories
    category = Category.find(params[:id])
    sub_categories = category.sub_categories
    render json: sub_categories
  end
  

  # POST /categories or /categories.json
  def create
    @category = Category.new(category_params)

    respond_to do |format|
      if @category.save
       render json: @category,status: :created
      else
        render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  # PATCH/PUT /categories/1 or /categories/1.json
  def update
    respond_to do |format|
      if @category.update(category_params)
        render json: @category,status: :created
      else
        render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
      end
    end
  end

  # DELETE /categories/1 or /categories/1.json
  def destroy
   
    if @category
      @category.destroy
      render json: { message: "category deleted successfully" }, status: :ok
    else
      render json: { errors: @category.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = Category.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:value)
    end

end
