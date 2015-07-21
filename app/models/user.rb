class User < ActiveRecord::Base
  has_many :auths
  has_many :projects
end
