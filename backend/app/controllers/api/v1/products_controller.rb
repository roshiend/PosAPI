class Api::V1::ProductsController < ApplicationController
  before_action :set_product, only: %i[ show edit update destroy ]
 
  # GET /products or /products.json
  def index
    @products = Product.includes(:option_types, :variants).all
  
    render json: @products.as_json(include: { 
      option_types: {  }, 
      variants: {}
    })
   
  end

  # GET /products/1 or /products/1.json
  def show
    
    render json: @product.as_json(include: { 
      option_types: { }, 
      variants: {}
    })
  end

  # GET /products/new
  def new
    @product = Product.new
    @option_types = OptionTypeSet.all
    
  end

  # GET /products/1/edit
  def edit
    @option_type_set = Rails.cache.fetch('option_type_set', expires_in: 12.hours) do
      OptionTypeSet.all.to_a
    end
    
  end

  def create
    #logger.debug "Product params: #{product_params.inspect}"

    @product = Product.new(product_params)
    #process_option_values
    if @product.save
      render json: @product, status: :created
    else
      render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
    
  
    # PATCH/PUT /products/1 or /products/1.json
    def update
      #logger.debug "Product params before update: #{product_params.inspect}"
      
      if @product
        if @product.update(product_params)
          render json: @product, status: :ok
        else
          render json: { errors: @product.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "product not found" }, status: :not_found
      end
    end
    
  
  
  
  
  

  # DELETE /products/1 or /products/1.json
  def destroy
       
    if @product
      @product.destroy
      render json: { message: "product deleted successfully" }, status: :ok
    else
      render json: { error: "product not found" }, status: :not_found
    end
  end


  

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_product
      @product = Product.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def product_params
      params.require(:product).permit(:title,:description,:master_price,:product_type_id, :category_id, :sub_category_id, :shop_location_id, :listing_type_id, :vendor_id,variants_attributes: [:id,:option1, :option2, :option3, :sku, :price,:unique_id,:barcode,:position,:quantity,:title,:_destroy],option_types_attributes:[:id,:name,:_destroy,:position,{ values: [] }])
    end

    # This method ensures that the values are stored as arrays
    def process_option_values
      params[:product][:option_types_attributes].each do |index, option_type|
        if option_type[:value].is_a?(String)
          # Convert the comma-separated string into an array of values
          option_type[:value] = option_type[:value]
        end
      end
    end
    
   
end
