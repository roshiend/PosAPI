class Api::V1::OptionTypesController < ApplicationController
  before_action :set_option_type, only: %i[ show edit update destroy ]

  # GET /option_types or /option_types.json
  def index
    @option_types = OptionType.all
    render json:@option_types
  end

  # GET /option_types/1 or /option_types/1.json
  def show
    if  @option_type
      render json:  @option_type, status: :ok
    else
      render json: { error: " option type not found" }, status: :not_found
    end
  end

  # GET /option_types/new
  def new
    @option_type = OptionType.new
    
  end

  # GET /option_types/1/edit
  def edit
  end

  # POST /option_types or /option_types.json
  def create
    @option_type = OptionType.new(option_type_params)

    if @option_type.save
      render json: @option_type, status: :created
    else
      render json: { errors: @option_type.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /option_types/1 or /option_types/1.json
  def update
    if @option_type
      if @option_type.update(user_params)
        render json: @option_type, status: :ok
      else
        render json: { errors: @option_type.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "option type not found" }, status: :not_found
    end
  end

  # DELETE /option_types/1 or /option_types/1.json
  def destroy
    
    if @option_type
      @option_type.destroy
      render json: { message: "option type deleted successfully" }, status: :ok
    else
      render json: { error: "option type not found" }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_option_type
      @option_type = OptionType.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def option_type_params
      params.require(:option_type).permit(:name)
    end
end
