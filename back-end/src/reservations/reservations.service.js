const knex = require("../db/connection");

function list(date){
  return knex("reservations")
        .select("*")
        .where("reservation_date", date)
        .whereNot({ status: "finished" })
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

module.exports = {
  list,
  create,
  update,
  getReservationById
}