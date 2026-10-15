import express from 'express';

const app = express();

const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello from expressss");
});

app.get("/poczekalnia", (req, res) => {
    res.send("poczekalnia");
})

app.get("/poczekalnia", (req, res) => {
    res.send("test");
})



app.listen(PORT, () => {
    console.log("sss")
})