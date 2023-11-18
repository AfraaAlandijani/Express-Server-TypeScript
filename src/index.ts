import express, { Application } from "express";
//import morgan from "morgan";

//import "dotenv/config";

import productsRoutes from "./routes/productsRoutes";
import { errorHandler } from "./middleware/errorHandler";

const app: Application = express();
const port: number = 3000;

//app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/products", productsRoutes);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/", (req, res) => {
  console.log(req.body);
  res.status(201).send({
    success: true,
    message: "Data is received",
    paylod: req.body,
  });
});

app.listen(port, () => {
  console.log("Our server is running");
});
