// import seed data files, arrays of objects
const leavesData = require("../seed-data/leaves");

exports.seed = async function (knex) {
  await knex("leaves").del();
  await knex("leaves").insert(leavesData);
};
