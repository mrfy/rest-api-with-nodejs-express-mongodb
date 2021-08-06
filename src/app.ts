const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

//IMPORT ROUTEe
import postRoute from "./routes/posts";
import userRoute from "./routes/user";
import workRoute from "./routes/work";
import skillRoute from "./routes/skills";

//INIT ROUTE
app.use("/user", userRoute);
app.use("/posts", postRoute);
app.use("/work", workRoute);
app.use("/skill", skillRoute);

//MONGODB CONNECTION
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB conected ..."))
  .catch((err: any) => console.log(err));
//START SERVER

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
