import express from "express";
import { envs } from "./app/@shared/envs";
import router from "./app/router";
import { globalError } from "./app/@shared/middlewares/global.error.middleware";

const app = express();

app.use(express.json());

app.use(router);

app.use(globalError);

app.listen(envs.port, () => {
  console.info(`Server is running on port ${envs.port}`);
});

export default app;
