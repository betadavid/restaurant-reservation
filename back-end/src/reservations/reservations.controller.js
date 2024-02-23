const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./reservations.service");

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;
  const data = await service.list(date);
  res.status(200).json({ data });
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

async function create(req, res, next){
  const reservation = req.body.data;
  const data = await service.create(reservation);
  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    dateIsCorrect,
    bodyDataHas("reservation_time"),
    isValidTime,
    bodyDataHas("people"),
    peopleIsNumber,
  asyncErrorBoundary(create)]
};
