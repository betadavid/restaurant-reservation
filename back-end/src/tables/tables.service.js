const knex = require("../db/connection");

function list(){
  return knex("tables").select("*").orderBy("table_name");
}

function create(table){
  return knex("tables")
        .insert(table)
        .returning("*")
        .then(createdRecords => createdRecords[0]);
}

function read(tableId){
  return knex("tables")
         .select("*")
         .where("table_id", tableId)
         .first();
}

function update(updatedTable){
  return knex.transaction(async (trx) => {
    await knex("reservations")
      .where("reservation_id", updatedTable.reservation_id)
      .update({ status: "seated" })
      .transacting(trx);

    return knex("tables")
      .select("*")
      .where("table_id", updatedTable.table_id)
      .update({ reservation_id: updatedTable.reservation_id }, "*")
      .transacting(trx)
      .then((createdRecords) => createdRecords[0]);
  });
}

function finish(reservation_id, table_id) {
  return knex.transaction(async (trx) => {
    await knex("reservations")
      .where({ reservation_id })
      .update({ status: "finished" })
      .transacting(trx);

    return knex("tables")
      .select("*")
      .where("table_id", table_id)
      .update({ reservation_id: null }, "*")
      .transacting(trx)
      .then((createdRecords) => createdRecords[0]);
  });
}

module.exports = {
  list,
  create,
  read,
  update,
  finish
}