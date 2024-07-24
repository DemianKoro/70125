const express = require('express')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const PORT = 8080
const app = express();

app.listen(PORT, () => {
    console.log("escuchando en el puerto" , PORT)
} )