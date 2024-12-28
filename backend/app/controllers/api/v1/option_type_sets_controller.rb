class Api::V1::OptionTypeSetsController < ApplicationController
  before_action :set_option_type_set, only: %i[ show edit update destroy ]

  # GET /option_type_sets or /option_type_sets.json
  def index
    @option_type_sets = OptionTypeSet.all
    render json: @option_type_sets,status :ok
  end

  # GET /option_type_sets/1 or /option_type_sets/1.json
  def show
    if @option_type_set
      render json: @option_type_set, status: :ok
    else
      render json: { error: "option type set not found" }, status: :not_found
    end
  end

  # GET /option_type_sets/new
  def new
    @option_type_set = OptionTypeSet.new
  end

  # GET /option_type_sets/1/edit
  def edit
  end

  # POST /option_type_sets or /option_type_sets.json
  def create
    @option_type_set = OptionTypeSet.new(option_type_set_params)
    if @option_type_set.save
      render json: @option_type_set, status: :created
    else
      render json: { errors: @option_type_set.errors.full_messages }, status: :unprocessable_entity
    end
   
  end

  # PATCH/PUT /option_type_sets/1 or /option_type_sets/1.json
  def update
    if @option_type_set.update(option_type_set_params)
      render json: @option_type_set, status: :ok
    else
      render json: { errors: @option_type_set.errors.full_messages }, status: :unprocessable_entity
    end
  else
    render js
  end

  # DELETE /option_type_sets/1 or /option_type_sets/1.json
  def destroy
    

    if @option_type_set
      @option_type_set.destroy
      render json: { message: "option type_set deleted successfully" }, status: :ok
    else
      render json: { errors: @option_type_set.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_option_type_set
      @option_type_set = OptionTypeSet.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def option_type_set_params
      params.fetch(:option_type_set, {})
    end
end
