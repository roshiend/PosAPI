class Api::V1::ShopLocationsController < ApplicationController
  before_action :set_shop_location, only: %i[ show edit update destroy ]

  # GET /shop_locations or /shop_locations.json
  def index
    @shop_locations = ShopLocation.all
    render json: @shop_locations, status: :ok
  end

  # GET /shop_locations/1 or /shop_locations/1.json
  def show
    if @shop_location
      render json: @shop_location, status: :ok
    else
      render json: { error: "shop location not found" }, status: :not_found
    end
  end

  # GET /shop_locations/new
  def new
    @shop_location = ShopLocation.new
  end

  # GET /shop_locations/1/edit
  def edit
  end

  # POST /shop_locations or /shop_locations.json
  def create
    @shop_location = ShopLocation.new(shop_location_params)

    if  @shop_location.save
      render json:  @shop_location, status: :created
    else
      render json: { errors:  @shop_location.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /shop_locations/1 or /shop_locations/1.json
  def update
    if @shop_location
      if @shop_location.update(shop_location_params)
        render json: @shop_location, status: :ok
      else
        render json: { errors: @shop_location.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "shop location not found" }, status: :not_found
    end
  end

  # DELETE /shop_locations/1 or /shop_locations/1.json
  def destroy
   

    if @shop_location
      @shop_location.destroy
      render json: { message: "shop location deleted successfully" }, status: :ok
    else
      render json: { error: "shop location not found" }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_shop_location
      @shop_location = ShopLocation.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def shop_location_params
      params.require(:shop_location).permit(:name, :code)
    end
end
