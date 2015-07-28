class User < ActiveRecord::Base
  has_many :auths
  has_many :projects

  def self.auth_parse(args)
    users = User.where(name: args[:account_username])
    if users.any?
      user = users.first
      auth = user.auths.find_by(network: "imgur")
      auth.update(args)
    else
      new_user = User.create(name: args[:account_username])
      new_user.auths << Auth.create({
        network: "imgur",
        network_id: args[:account_id],
        access_token: args[:access_token],
        refresh_token: args[:refresh_token]
        })
    end
  end
end
