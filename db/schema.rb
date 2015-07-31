# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150731002945) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "auths", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "network"
    t.string   "network_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "access_token"
    t.string   "refresh_token"
  end

  create_table "projects", force: :cascade do |t|
    t.string   "title"
    t.integer  "user_id"
    t.integer  "default_width"
    t.integer  "default_height"
    t.integer  "color_depth"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.string   "imgur_id"
  end

  create_table "slides", force: :cascade do |t|
    t.integer  "project_id"
    t.integer  "width"
    t.integer  "height"
    t.integer  "left"
    t.integer  "top"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "title"
  end

  create_table "users", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
