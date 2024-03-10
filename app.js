const express = require("express")
const app = express()
const methodOverride = require('method-override')
const port = 3000

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

const help = require("./app/models/help")
app.use("/ajuda", help)

const client = require("./app/routes/client")
app.use("/cliente", client)

const shipper = require("./app/routes/shipper")
app.use("/entregador", shipper)

/* Não mexer  Alex está organizando isso */

const admin = require("./app/routes/admin")
app.use("/admin", admin)

const cadastro_geral = require("./app/models/cadastro_geral")
app.use("/cadastro", cadastro_geral)

/* fim */

app.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nhttp://localhost:${port}`)
})
