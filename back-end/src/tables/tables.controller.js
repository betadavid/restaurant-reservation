const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const service = require("./tables.service");
const reservationsController = require("../reservations/reservations.controller");

const VALID_PROPERTIES = [
  "table_name",
  "capacity",
  "reservation_id"
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


function bodyDataHas(propertyName){
  return function (req, res, next){
      const { data = {} } = req.body;
      if(data[propertyName]){
          next();
      }else{
          next({
              status: 400,
              message: `table must include a ${propertyName}`
          });
      }
  }
}

function hasValidName(req, res, next){
  const { table_name } = req.body.data;
  if(table_name.length < 2){
    next({
      status: 400,
      message: `Invalid table_name: ${table_name}`
    });
  }
  next();
}

function hasValidCapacity(req, res, next){
  const { capacity } = req.body.data;
  if(!Number.isInteger(capacity)){
    next({
      status: 400,
      message: `capacity needs to be a number(integer): ${capacity}`
    });
  }
  if(capacity < 1){
    next({
      status: 400,
      message: `capacity needs to be at least 1: ${capacity}`
    });
  }
  next();
}

async function tableExists(req, res, next){
  const {table_id} = req.params;
  const table = await service.read(table_id);
  if(table){
    res.locals.table = table;
    next();
  }else{
    next({
      status: 404,
      message: `table not found: ${table_id}`
    });
  }
}

function tableHasSufficientCapacity(req, res, next){
  const tableCapacity = res.locals.table.capacity;
  const partySize = res.locals.reservation.people;
  if(partySize > tableCapacity){
    next({
      status: 400,
      message: `table does not have sufficient capacity`
    });
  }
  next();
}

function tableIsNotOccupied(req, res, next){
  if(res.locals.table.reservation_id){
    next({
      status: 400,
      message: "table is occupied"
    });
  }else{
    next();
  }
}
function tableIsOccupied(req, res, next){
  if(res.locals.table.reservation_id){
    next();
  }else{
    next({
      status: 400,
      message: "table is not occupied"
    });
  }
}

async function list(req, res, next){
  const data = await service.list();
  res.json({data});
}

async function create(req, res, next){
  const table = req.body.data;
  const data = await service.create(table);
  res.status(201).json({ data });
}

async function update(req, res, next){

  const updatedTable = {
    ...res.locals.table,
    reservation_id: res.locals.reservation.reservation_id
  };
  const data = await service.update(updatedTable);

  res.json({data});
}

async function freeTable(req, res, next){
  const {reservation_id, table_id} = res.locals.table
  const data = await service.finish(reservation_id, table_id);
  res.json({data});
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [hasOnlyValidProperties,
           bodyDataHas("table_name"),
           hasValidName,
           bodyDataHas("capacity"),
           hasValidCapacity,
           asyncErrorBoundary(create)],
  update: [hasOnlyValidProperties,
           bodyDataHas("reservation_id"),
           asyncErrorBoundary(reservationsController.reservationExists),
           reservationsController.reservationIsNotSeated,
           asyncErrorBoundary(tableExists),
           tableIsNotOccupied,
           tableHasSufficientCapacity,
           asyncErrorBoundary(update)],
  finish: [hasOnlyValidProperties,
           asyncErrorBoundary(tableExists),
           tableIsOccupied,
           asyncErrorBoundary(freeTable)]
}
