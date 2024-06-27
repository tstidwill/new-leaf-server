/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable("leaves", (table) => {
    table.decimal("lat", 10, 7).alter();
    table.decimal("lng", 10, 7).alter();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable("leaves", (table) => {
    table.float("lat").alter();
    table.float("lng").alter();
  });
};
