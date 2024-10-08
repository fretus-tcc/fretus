const express = require("express")
const app = express()
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')
const port = 3001

const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
require('./config/socket').init(server, io);

app.use(express.static("./app/public"))

app.set("view engine", "ejs")
app.set("views", "./app/views")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(session({
  secret: "secret",
  saveUninitialized: true,
  resave: false,
  cookie: { secure: false }
}))
app.use(flash())

const main = require("./app/routes/main")
app.use("/", main)

const client = require("./app/routes/client")
app.use("/cliente", client)

const shipper = require("./app/routes/shipper")
app.use("/entregador", shipper)

const adm = require("./app/routes/admin")
app.use("/admin", adm)

const help = require("./app/routes/help")
app.use("/admin/ajuda", help)

const cupons = require("./app/routes/cupons-admin")
app.use("/admin/cupons", cupons)

const chat = require('./app/routes/chat');
app.use('/', chat);

const locaisPerigosos = require("./app/routes/locaisPerigosos")
app.use("/locais-perigosos", locaisPerigosos)

server.listen(port, () => {
  console.log(`Servidor ouvindo na porta ${port}\nhttp://localhost:${port}`);
});
