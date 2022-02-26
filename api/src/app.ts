import cookieParser from "cookie-parser";
import express, { Application, ErrorRequestHandler } from "express";
import morgan from "morgan";
import routes from "./routes";

const server: Application = express();

server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(express.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
server.use(<ErrorRequestHandler>function (err, req, res, next) {
  res.status(err.status ?? 500);
  res.json({ success: false, error: err.message ?? err });
  next(err);
});
server.use("/", routes);

export default server;
