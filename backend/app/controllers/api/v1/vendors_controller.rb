class Api::V1::VendorsController < ApplicationController
  before_action :set_vendor, only: %i[ show edit update destroy ]

  # GET /vendors or /vendors.json
  def index
    @vendors = Vendor.all
    render json: @vendors, status: :ok
  end

  # GET /vendors/1 or /vendors/1.json
  def show
    if @vendor
      render json: @vendor, status: :ok
    else
      render json: { error: "vendor not found" }, status: :not_found
    end
  end

  # GET /vendors/new
  def new
    @vendor = Vendor.new
  end

  # GET /vendors/1/edit
  def edit
  end
  
  def code
    vendor = Vendor.find(params[:id])
    render json: { code: vendor.code }
  end

  # POST /vendors or /vendors.json
  def create
    @vendor = Vendor.new(vendor_params)

    if @vendor.save
      render json: @vendor, status: :created
    else
      render json: { errors: @vendor.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /vendors/1 or /vendors/1.json
  def update
    if @vendor
      if @vendor.update(vendor_params)
        render json: @vendor, status: :ok
      else
        render json: { errors: @vendor.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "vendor not found" }, status: :not_found
    end
  end

  # DELETE /vendors/1 or /vendors/1.json
  def destroy
    if @vendor
      @vendor.destroy
      render json: { message: "vendor deleted successfully" }, status: :ok
    else
      render json: { error: "vendor not found" }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_vendor
      @vendor = Vendor.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def vendor_params
      params.require(:vendor).permit(:name, :code)
    end
end
