class Api::V1::ListingTypesController < ApplicationController
  before_action :set_listing_type, only: %i[ show edit update destroy ]

  # GET /listing_types or /listing_types.json
  def index
    @listing_types = ListingType.all
    render json: @listing_types,status: :ok
  end

  # GET /listing_types/1 or /listing_types/1.json
  def show
    render json: @listing_type,status: :ok
  end

  # GET /listing_types/new
  def new
    @listing_type = ListingType.new
  end

  # GET /listing_types/1/edit
  def edit
  end

  # POST /listing_types or /listing_types.json
  def create
    @listing_type = ListingType.new(listing_type_params)

    respond_to do |format|
      if @listing_type.save
        
        render json:@listing_type , status: :created
      else
        render json: { errors: @listing_type.errors.full_messages }, status: :unprocessable_entity 
       
      end
    end
  end

  # PATCH/PUT /listing_types/1 or /listing_types/1.json
  def update
    respond_to do |format|
      if @listing_type.update(listing_type_params)
        render json:@listing_type , status: :created
      else
        render json: { errors: @listing_type.errors.full_messages }, status: :unprocessable_entity 
      end
    end
  end

  # DELETE /listing_types/1 or /listing_types/1.json
  def destroy
    

    if  @listing_type
      @listing_type.destroy
      render json: { message: " listing type deleted successfully" }, status: :ok
    else
      render json: { errors: @listing_type.errors.full_messages }, status: :unprocessable_entity 
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_listing_type
      @listing_type = ListingType.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def listing_type_params
      params.require(:listing_type).permit(:name, :code)
    end
end
