const express = require("express")
const app = express()
const port = 3000
const fs = require("fs");

const cors = require("cors");
const bodyParser = require("body-parser")

const server = app.listen(port, () => {
    console.log("Listening on port " + port);
})

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/add_mac", (req, response) => {
    let response_message = ""
    let data = fs.readFileSync("./data.json", "utf-8")
    let content = data ? JSON.parse(data) : JSON.parse("[]");
    content.forEach((obj) => {
        if(obj.mac == req.body.mac) {
            response_message = "Data confilict! (This MAC address already exists in database!)"
        }
        else if(obj.sala == req.body.sala) {
            response_message = "Data confilict! (This classroom already exists in database!)"
        }
    });
    if (response_message == "") {
        content.push(req.body)
        data = JSON.stringify(content, null, 2)
        fs.writeFileSync("./data.json", data, "utf-8")
        console.log(`Recieved response from ${req.body.sala} : ${req.body.ip}`)
        response.end("good")
    }
    else {
        console.log(`Rejected response from ${req.body.sala} : ${req.body.ip}`)
        response.status(409).end(response_message)
    }
})