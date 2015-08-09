class CreateSupporters < ActiveRecord::Migration
  def change
    create_table :supporters do |t|
      t.string :name
      t.text :lang
      t.text :sport
      t.float :long
      t.float :lat

      t.timestamps
    end
  end
end
