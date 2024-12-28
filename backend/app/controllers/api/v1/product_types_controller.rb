class Api::V1::ProductTypesController < ApplicationController
  before_action :set_product_type, only: %i[ show edit update destroy ]

  # GET /product_types or /product_types.json
  def index
    @product_types = ProductType.all
    render json: @product_types,status :ok
  end

  # GET /product_types/1 or /product_types/1.json
  def show
    if @product_types
      render json: @product_types, status: :ok
    else
      render json: { error: "Product type not found" }, status: :not_found
    end
  end

  # GET /product_types/new
  def new
    @product_type = ProductType.new
  end

  # GET /product_types/1/edit
  def edit
  end

  # POST /product_types or /product_types.json
  def create
    @product_type = ProductType.new(product_type_params)

    if @product_type.save
      render json: @product_type, status: :created
    else
      render json: { errors: @product_type.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /product_types/1 or /product_types/1.json
  def update
    if @product_type
      if @product_type.update(product_type_params)
        render json: @product_type, status: :ok
      else
        render json: { errors: @product_type.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "product type not found" }, status: :not_found
    end
  end

  # DELETE /product_types/1 or /product_types/1.json
  def destroy
    

    if @product_type
      @product_type.destroy
      render json: { message: "product type deleted successfully" }, status: :ok
    else
      render json: { error: "product type not found" }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product_type
      @product_type = ProductType.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_type_params
      params.require(:product_type).permit(:name)
    end
end
