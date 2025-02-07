class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: { email: user.email, csrf_token: form_authenticity_token }, status: :ok
    else
      render json: :no_content, status: :no_content
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      render json: user, status: :created
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :cpf, :password, :password_confirmation)
  end
end