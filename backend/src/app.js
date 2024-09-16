import express from "express";
import cors from "cors";
import itemRouter from "./routes/itemRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// app.use(
//   cors({
//     origin: "http://localhost:3000", // Allow requests from this origin
//   })
// );

app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true, limit: "15kb" }));

//routes
app.use("/api/items", itemRouter);
app.use("/api/category", categoryRouter);
export { app };
