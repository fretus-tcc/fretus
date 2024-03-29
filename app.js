const express = require("express")
const app = express()
const methodOverride = require('method-override')
const port = 3001

const dotenv = require('dotenv');
dotenv.config();

app.use(express.static("./app/public"))

app.set("view engine", "ejs")
app.set("views", "./app/views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

/* app.use(
    session({
      secret: "HELLo nODE",
      resave: false,
      saveUninitialized: false,
})) */

const main = require("./app/routes/main")
app.use("/", main)

const help = require("./app/routes/help")
app.use("/ajuda", help)

const client = require("./app/routes/client")
app.use("/cliente", client)

const shipper = require("./app/routes/shipper")
app.use("/entregador", shipper)


app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nhttp://localhost:${port}`)
})
