//Servidor
const express = require('express')
const server = express()
const {pageLanding,pageStudy,pageGiveClasses,saveClasses} = require('./pages')


//configurar nunjucks(template engine)
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
   express: server,
   noCache: true,
})

//inicio e configuração do servidor
server
//receber os dados do req.body
.use(express.urlencoded({extended:true}))
//configurar arquivos estaticos (css, scripts, imagens)
.use(express.static("public"))
//rotas da aplicação
.get("/", pageLanding )
.get("/study", pageStudy) 
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)

.listen(5500)