const knex = require("../db/connection");

function list(date){
  return knex("reservations")
        .select("*")
        .where("reservation_date", date)
        .whereNot({ status: "finished" })
        .whereNot({ status: "cancelled" })
        .orderBy("reservation_time");
}

function create(reservation){
  return knex("reservations")
        .insert(reservation)
        .returning("*")
        .then(createdReservations => createdReservations[0]);
}

function getReservationById(reservationId){
  return knex("reservations").select("*").where("reservation_id", reservationId).first();
}

function update(updatedReservation){
  return knex("reservations")
         .select("*")
         .where("reservation_id", updatedReservation.reservation_id)
         .update(updatedReservation, "*")
         .then(updatedRecords=>updatedRecords[0]);
}

function search(mobile_number) {
  return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
}

module.exports = {
  list,
  create,
  update,
  getReservationById,
  search
}