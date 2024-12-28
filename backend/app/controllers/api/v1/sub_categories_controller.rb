class Api::V1::SubCategoriesController < ApplicationController
  before_action :set_sub_catogory, only: %i[ show edit update destroy ]

  # GET /sub_catogories or /sub_catogories.json
  def index
    @sub_catogories = SubCatogory.all
    render json: @sub_catogories,status: :ok
  end

  # GET /sub_catogories/1 or /sub_catogories/1.json
  def show
    if @sub_catogory
      render json: @sub_catogory, status: :ok
    else
      render json: { error: "sub category not found" }, status: :not_found
    end
  end

  # GET /sub_catogories/new
  def new
    @sub_catogory = SubCatogory.new
  end

  # GET /sub_catogories/1/edit
  def edit
  end

  # POST /sub_catogories or /sub_catogories.json
  def create
    @sub_catogory = SubCatogory.new(sub_catogory_params)

    if @sub_catogory.save
      render json: @sub_catogory, status: :created
    else
      render json: { errors: @sub_catogory.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /sub_catogories/1 or /sub_catogories/1.json
  def update
    if @sub_catogory
      if @sub_catogory.update(sub_catogory_params)
        render json: @sub_catogory, status: :ok
      else
        render json: { errors: @sub_catogory.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "sub category not found" }, status: :not_found
    end
  end

  # DELETE /sub_catogories/1 or /sub_catogories/1.json
  def destroy
    

    if @sub_catogory
      @sub_catogory.destroy
      render json: { message: "sub category deleted successfully" }, status: :ok
    else
      render json: { error: "sub category not found" }, status: :not_found
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_sub_catogory
      @sub_catogory = SubCatogory.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def sub_catogory_params
      params.require(:sub_catogory).permit(:name)
    end
end
