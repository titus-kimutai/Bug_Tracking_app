import express from "express";
import router from "./Routes/index.mjs";

const app = express();

app.use(express.json());

// Use our router
app.use(router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
