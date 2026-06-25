import app from "./app.js";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;

dotenv.config();

app.listen(PORT, () => {
  console.log(`Started on ${PORT}`);
});
