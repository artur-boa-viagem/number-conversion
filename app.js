//Carregando módulos
const soap = require('soap')
const express = require('express')
const handlebars = require('express-handlebars')
const app = express()
const path = require('path')
//const mongoose = require("mongoose")
const url = "https://www.dataaccess.com/webservicesserver/NumberConversion.wso?WSDL"

//Configurações
    //falecido body-parser
    app.use(express.urlencoded({extended: true}))
    app.use(express.json())
    //handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    //Public
    app.use(express.static(path.join(__dirname, "public")))
//Rotas
app.get("/", (req, res) => {
    res.render("admin/index")
})
app.post("/converter", (req, res) => {
    soap.createClient(url, (err, client) => {
        if(err){
            console.log("erro: " + err)
            res.render("/")
        }
        else{
            let resposta = []
            console.log("ok")
            client.NumberToWords({
                ubiNum: req.body.numero
            }, (err, resultado) => {
                if (err){
                    console.log("erro ao consultar o cep: " + err)
                    res.render("/")
                }
                else{
                    resposta.push({texto: resultado})
                    //console.log(resultado)
                    res.render("admin/index", {resposta: resposta})
                }
            })
        }
    })
})
//Outros

const PORT = 8081
app.listen(PORT, () => {
    console.log("servidor rodando!")
})
