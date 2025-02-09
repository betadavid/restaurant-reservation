const tables = require("./01-tables.json");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex.raw("TRUNCATE TABLE tables RESTART IDENTITY CASCADE")
  .then(() => knex("tables").insert(tables));
};
