const express = require("express");
const app = express();

app.use(express.json()); 
const cors = require("cors");
app.use(cors());

const mainRouter = require("./routes/index");

app.use("/api/v1", mainRouter);
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});