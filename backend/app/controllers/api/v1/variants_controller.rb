class Api::V1::VariantsController < ApplicationController
  before_action :set_variant, only: %i[ show edit update destroy ]

  # GET /variants or /variants.json
  def index
    @variants = Variant.all
    render json: @variants, status: :ok
  end

  # GET /variants/1 or /variants/1.json
  def show
    if @variant
      render json: @variant, status: :ok
    else
      render json: { error: "variant not found" }, status: :not_found
    end
  end

  # GET /variants/new
  def new
    @variant = Variant.new
  end

  # GET /variants/1/edit
  def edit
  end

  # POST /variants or /variants.json
  def create
    @variant = Variant.new(variant_params)

    if @variant.save
      render json: @variant, status: :created
    else
      render json: { errors: @variant.errors.full_messages }, status: :unprocessable_entity
    end
  end

 

  # PATCH/PUT /variants/1 or /variants/1.json
  def update
    if  @variant
      if user.update(variant_params)
        render json:  @variant, status: :ok
      else
        render json: { errors:  @variant.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "variant not found" }, status: :not_found
    end
  end

  # DELETE /variants/1 or /variants/1.json
  def destroy
    if  @variant
      @variant.destroy
      render json: { message: "variant deleted successfully" }, status: :ok
    else
      render json: { error: "variant not found" }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_variant
      @variant = Variant.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def variant_params
      params.fetch(:variant, {})
    end
end
