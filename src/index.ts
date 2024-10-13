import dotenv from "dotenv";
import express, { Request, Response } from "express";
import routerAuth from "./routes/auth-route";
import routeUser from "./routes/user-route";
import routeInformation from "./routes/information-route";
import routeTransaction from "./routes/transaction-route";
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "../swagger/swagger-output.json";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT || 3000;

app.use(
  "/docs",
  swaggerUI.serve,
  swaggerUI.setup(swaggerDoc, {
    explorer: true,
    swaggerOptions: {
      persistAuthorization: true,
      displayRequestDuration: true,
    },
  })
);

app.get("/", async (req: Request, res: Response) => {
  res.send("HELLO");
});

app.use("/api", routerAuth);
app.use("/api", routeUser);
app.use("/api", routeInformation);
app.use("/api", routeTransaction);

app.listen(port, () => {
  console.log(`SERVER RUNNING ON PORT ${port}`);
});
