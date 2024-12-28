class Api::V1::OptionValueSetsController < ApplicationController
  before_action :set_option_value_set, only: %i[ show edit update destroy ]

  # GET /option_value_sets or /option_value_sets.json
  def index
    @option_value_sets = OptionValueSet.all
    render json: @option_type_sets, status: :ok
  end

  # GET /option_value_sets/1 or /option_value_sets/1.json
  def show
    if @option_value_set
      render json: @option_value_set, status: :ok
    else
      render json: { error: "option value set not found" }, status: :not_found
    end
  end

  # GET /option_value_sets/new
  def new
    @option_value_set = OptionValueSet.new
  end

  # GET /option_value_sets/1/edit
  def edit
  end

  # POST /option_value_sets or /option_value_sets.json
  def create
    @option_value_set = OptionValueSet.new(option_value_set_params)

    if @option_value_set.save
      render json: @option_value_set, status: :created
    else
      render json: { errors: @option_value_set.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /option_value_sets/1 or /option_value_sets/1.json
  def update
    if @option_value_set
      if @option_value_set.update(option_value_set_params)
        render json: @option_value_set, status: :ok
      else
        render json: { errors: @option_value_set.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: " option value set not found" }, status: :not_found
    end
  end

  # DELETE /option_value_sets/1 or /option_value_sets/1.json
  def destroy
    

    if @option_value_set
      @option_value_set.destroy
      render json: { message: "option value set deleted successfully" }, status: :ok
    else
      render json: { error: "option value set not found" }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_option_value_set
      @option_value_set = OptionValueSet.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def option_value_set_params
      params.require(:option_value_set).permit(:value,:option_type_set_id)
    end
end
