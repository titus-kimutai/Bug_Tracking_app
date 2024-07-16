import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./Routes/index.mjs";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
