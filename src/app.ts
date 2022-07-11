import express, {json} from "express";
import cors from "cors";
import "express-async-errors";
import router from "./routes/router.js";
import handlerErrorMiddleware from "./middlewares/handlerErrorMiddleware.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);
app.use(handlerErrorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});

