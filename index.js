import express from "express";
import dotenv from "dotenv";
import connectDatabase from "./database/db.js";
import path from "path";
import Music from "./model/Music.js";

const __dirname = path.resolve();

dotenv.config();
const app = express();
const port = process.env.PORT;
let music = null;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

connectDatabase();

app.get("/", async (req, res) => {
  const playlist = await Music.find();//RETORNA A LISTA NO BANCO 
  res.render("index", { playlist });//RENDERIZA A PLAYLIST NO INDEX
});

app.get("/admin", async (req, res) => {
  const playlist = await Music.find();//RETORNA A LISTA NO BANCO  
  res.render("admin", { playlist, music: null, musicDel: null });//RENDERIZA A PLAYLIST NO ADMIN
});

app.post("/create", async (req, res) => {//CRIA A LISTA NO BANCO DE DADOS 
  const music = req.body; //ENVIA A INFORMAÇÃO 
  await Music.create(music); //GRAVANDO AS INFORMAÇÕES NO BANCO
  res.redirect("/"); //REDIRECIONA PARA O INDEX
});

app.get("/by/:id/:action", async (req, res) => {
  const { id, action } = req.params; //CRIANDO UMA ROTA 
  music = await Music.findById({ _id: id }); //CONSULTA A MUSICA NO BANCO DE DADOS 
  const playlist = await Music.find();//RETORNA A LISTA NO BANCO 
  if (action == "edit") {//SE ACTION FOR IGUAL A EDIT 
        res.render("admin", { playlist, music, musicDel: null }); //RENDERIZA O EDITAR
  } else {//SE FALSO
    res.render("admin", { playlist, music: null, musicDel: music }); //RENDERIZA O DELETAR
  }
});

app.post("/update/:id", async (req, res) => {
  const newMusic = req.body; //SOLICITO A MUSICA NO SERVIDOR 
  await Music.updateOne({ _id: req.params.id }, newMusic); //ATUALIZO O BANCO COM A NOVA DESCRIÇÃO
  res.redirect("/admin"); //REDIRECIONA PARA O ADMIN
});

app.get("/delete/:id", async (req, res) => {
  await Music.deleteOne({ _id: req.params.id }); //PEGA O ID E DELETA DO SERVIDOR
  res.redirect("/admin"); //REDIRECIONA PARA O ADMIN
});
app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}/`)
);
