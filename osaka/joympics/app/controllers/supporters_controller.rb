class SupportersController < ApplicationController

  def index
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    @supporters=Supporter.all.limit(5)

    @supporters.each do |supporter|
      render :json => supporter
    end
  end

end
