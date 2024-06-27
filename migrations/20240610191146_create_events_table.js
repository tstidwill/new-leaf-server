/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("events", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("date").notNullable();
    table.string("time");
    table.string("location");
    table.string("city").notNullable();
    table.string("organizer");
    table.string("link");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("events");
};
