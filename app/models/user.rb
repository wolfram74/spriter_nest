class User < ActiveRecord::Base
  has_many :auths
  has_many :projects

  def self.auth_parse(args)
    user = User.where(name: args[:account_username])
    if user.any?
      
    end
  end
end
