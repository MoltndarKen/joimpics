class SupportersController < ApplicationController

  def index

    @supporters=Supporter.all.limit(5)


  end

end
