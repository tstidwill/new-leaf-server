const eventsData = require("../seed-data/events");

exports.seed = async function (knex) {
  await knex("events").del();
  await knex("events").insert(eventsData);
};
