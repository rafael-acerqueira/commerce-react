class SessionsController < ApplicationController

  def create
    params = sessions_params[:user]&.downcase
    user = User.where("email  = ? OR cpf = ?", params, params ).first
    if user&.authenticate(sessions_params[:password])
      reset_session
      session[:user_id] = user.id
      render json: { email: user.email }, status: :ok
    else
      render json: { errors: ["Invalid email/cpf or password"]}, status: :unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
    head :no_content
  end



  private

  def sessions_params
    params.require(:session).permit(:user, :password)
  end
end
