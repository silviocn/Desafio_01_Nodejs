require("express-async-errors");
const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");

const express = require("express");
const routes = require("./routes");

migrationsRun();

const app = express();

app.use(express.json());
app.use(routes); // It's going to tell the program to use theses routes (click on CTRL + routes to see the routes) (1)

app.use(( error, request, response, next ) => { // always have to use this pattern: error/request/response/next even though not using all

  if (error instanceof AppError) { // this will check if it's an error from the client (some wrong data introduced by user)
    return response.status(error.statusCode).json({
      status: "error",
      message: error.message
    })
  }

  console.error(error);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  })


});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));