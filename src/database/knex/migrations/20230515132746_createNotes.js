exports.up = knex => knex.schema.createTable("notes", table => {
  table.increments("id");
  table.text("title");
  table.text("description");
  table.integer("rating");
  table.integer("user_id").references("id").inTable("users"); // creating a field called user id and telling that he has reference with id in Table users
  // table.integer("note_id").references("id").inTable("notes");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("notes");