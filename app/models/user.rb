class User < ActiveRecord::Base
  has_many :auths
  has_many :projects

  def self.auth_parse(args)
    users = User.where(name: args[:account_username])
    p "*-"*10
    if users.any?
      user = users.first
      auth = user.auths.find_by(network: "imgur")
      auth.update(args)
    else
      
    end
  end
end
