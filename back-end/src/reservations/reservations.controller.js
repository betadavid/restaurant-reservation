const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

async function reservationExists(req, res, next){
  const reservationId = req.params.reservation_id || req.body.data.reservation_id;
  const reservation = await service.getReservationById(reservationId);
  if(reservation){
    res.locals.reservation = reservation;
    next();
  }else{
    next({
      status: 404,
      message: `reservation not found: ${reservationId}`
    });
  }
}

function bodyDataHas(propertyName){
  return function (req, res, next){
      const { data = {} } = req.body;
      if(data[propertyName]){
          next();
      }else{
          next({
              status: 400,
              message: `Reservation must include a ${propertyName}`
          });
      }
  }
}

function dateIsCorrect(req, res, next){
  const date = req.body.data.reservation_date;
  if(!isNaN(new Date(date))){
    next();
  }else{
    next({
      status: 400,
      message: `invalid reservation_date ${date}`
    });
  }
}

function isWorkingDate(req, res, next){
  const {reservation_date, reservation_time} = req.body.data;
  const tuesday = 2;
  const date = new Date(`${reservation_date}T${reservation_time}`);
  if(date.getDay() === tuesday){
    next({
      status: 400,
      message: `Restaurant is closed for the selected day: ${date}`
    });
  }
  if(Date.parse(date) <= Date.now()){
    next({
      status: 400,
      message: `Reservation must be on a future day: ${date}`
    });
  }
  next();
}

function isElegibleTimeFrame(req, res, next){
  const {reservation_date, reservation_time} = req.body.data;
  const date = new Date(`${reservation_date}T${reservation_time}`);
  const hours = date.getHours();
  const mins = date.getMinutes();

  if(hours < 10 || (hours === 10 && mins < 30)){
    next({
      status: 400,
      message: "Reservation must be after 10:30 AM"
    });
  }
  if(hours > 21 || (hours === 21 && mins > 30)){
    next({
      status: 400,
      message: "Reservation must be before 9:30 PM"
    });
  }
  next();
}

function isValidTime(req, res, next){
  const time = req.body.data.reservation_time;
  const regex = new RegExp(/^([01]\d|2[0-3]):?([0-5]\d)$/);
  if (regex.test(time)) {
    next();
  }
  else {
    next({
      status: 400,
      message: "reservation_time is not valid"
    });
  }
}

function peopleIsNumber(req, res, next){
  const people = req.body.data.people;
  if(Number.isInteger(people)){
    next();
  }else{
    next({
      status: 400,
      message: "number of people needs to be a number"
    });
  }
}

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
  "reservation_id",
  "created_at",
  "updated_at",
];

function hasOnlyValidProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidProperties = Object.keys(data).filter(
    (property) => !VALID_PROPERTIES.includes(property)
  );

  if (invalidProperties.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidProperties.join(", ")}`,
    });
  }
  next();
}

function statusIsBooked(req, res, next){
  const { status = "booked" } = req.body.data;
  if(status === "booked"){
    next();
  }else{
    next({
      status: 400,
      message: `statusIsBooked invalid status: ${status}`
    });
  }
}

function hasValidStatus(req, res, next){
  const { status } = req.body.data;
  const currentStatus = res.locals.reservation.status;

  if(currentStatus === "finished"){
    next({
      status: 400,
      message: `reservation status is ${currentStatus}`
    });
  }
  const validStatus = ["booked", "seated", "finished"];

  if(validStatus.includes(status)){
    next();
  }else{
    next({
      status: 400,
      message: `hasValidStatus invalid status: ${status}`
    });
  }
}

function reservationIsNotSeated(req, res, next) {
  if (res.locals.reservation.status === "seated") {
    return next({
      status: 400,
      message: `reservation is already seated`,
    });
  }
  next();
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date, mobile_number } = req.query;
  let data = {};
  if(date){
    data = await service.list(date);
  }
  else{
    data = await service.search(mobile_number);
  }
  res.status(200).json({ data });
}

async function create(req, res, next){
  const reservation = req.body.data;
  const data = await service.create(reservation);
  res.status(201).json({ data });
}

async function read(req, res, next){
  res.json({data: res.locals.reservation});
}

async function update(req, res, next){
  const updatedReservation = {
    ...res.locals.reservation,
    status: req.body.data.status
  };
  const data = await service.update(updatedReservation);
  res.json({data});
}

module.exports = {
  reservationExists,
  reservationIsNotSeated,
  list: [asyncErrorBoundary(list)],
  create: [hasOnlyValidProperties,
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    dateIsCorrect,
    isWorkingDate,
    bodyDataHas("reservation_time"),
    isValidTime,
    isElegibleTimeFrame,
    bodyDataHas("people"),
    peopleIsNumber,
    statusIsBooked,
  asyncErrorBoundary(create)],
  read: [asyncErrorBoundary(reservationExists),
         read],
  update: [hasOnlyValidProperties,
           bodyDataHas("status"),
           asyncErrorBoundary(reservationExists),
           hasValidStatus,
           asyncErrorBoundary(update)]
};
