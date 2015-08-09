class SupportersController < ApplicationController

  def index
    @supporters=Supporter.all.limit(5)

    # @supporters.each do |supporter|
    #   render :json => supporter
    # end
  end

end
