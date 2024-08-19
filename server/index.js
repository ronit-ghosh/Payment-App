const express = require("express");
const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();
app.use(cors({
    origin: ["https://payments-app-rg.vercel.app"],
    methods: ['POST', 'GET', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true
}));
app.use(express.json());

app.use("/api/v1", mainRouter);

app.get('/', (req, res) => {
    res.send("Hi There!")
})
