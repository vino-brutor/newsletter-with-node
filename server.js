const express = require('express')
const path = require('path')

const app = express()

const emailList = []

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname,'src', 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/cadastro', (req, res) => {
    const email = req.body.email
    emailList.push(email)
    console.log(emailList)
    res.redirect('/sucess')
})

app.get('/sucess', (req, res) => {
    res.render('sucess')
})

app.get('/emails', (req, res) => {
    res.render('emails', {emails: emailList})
})


app.post('/delete-email', (req, res) => {
    const index = emailList.indexOf(req.body.email)
    if(index > -1){
        emailList.splice(index, 1)
    }
    res.redirect('/emails')
})
const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`)
})