class Auth < ActiveRecord::Base
  belongs_to :user

  def update(args)
    p "*++"*10
    self.update_attributes({
      access_token: args[:access_token],
      refresh_token: args[:refresh_token]
      })
  end
end
