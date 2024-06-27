const knex = require("knex")(require("../knexfile"));
const router = require("express").Router();

router.get("/", async (_req, res) => {
  try {
    const data = await knex("leaves");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).send(`Error retrieving leaves: ${err}`);
  }
});

module.exports = router;
