// express
const express = require('express')
const bodyParser = require('body-parser')
const {validateUser} = require('./validation.cjs')
const app = express()
const { v4: uuidv4 } = require("uuid");

const PORT = 4001
const cors = require('cors')
app.use(cors())
app.use(bodyParser.json())

// files
const fs = require('fs')
let users = require('./users.json')

app.get('/',(req,res) => {
    res.send("Hello Welcome to th users project")
})

app.get('/users',(req,res) => {
    res.json(users)
})

app.post('/adduser',(req,res) => {
    let user = req.body
    user.id = uuidv4()
    if(validateUser(user)) {
        // write new user to file
        users.push(user)
        fs.writeFileSync('./users.json',JSON.stringify(users))
        res.status(201) // created
        res.send('Succesfuly added a new user ' + user.firstName)
    }else {
        res.status(404)
        res.send('Could not add user, validation failed')
    }
})

app.put('/edit',(req,res) => { // http://localhost:4001/edit?userId=19213123
    const {userId} = req.query

    const match = users.findIndex(user => user.id === userId)
    
    if(match === -1) {
        res.status(404)
        res.send('Could not find user with id ' + userId)
    }else {
        if(validateUser(req.body)) {
        users[match] = req.body
        fs.writeFileSync('./users.json',JSON.stringify(users))
        res.status(200) //OK
        res.send('Succesfuly edited user with id ' + userId) 

        } else {
            res.status(404)
            res.send('There was a problem editting user with id: ' + userId)

        }
    }

})

app.get('/userById',(req,res) => {
    const {userId} = req.query
    const match = users.find(user => user.id === userId)
    if(match === null || match === undefined) {
        res.status(400)
        res.send('No user with id ' + userId)
    }else {
        res.status(200)
        res.json(match)
    }

})


app.delete('/delete',(req,res) => {
    const {userId} = req.query

    const match = users.findIndex(user => user.id === userId)
    if(match === -1) {
        res.status(400)
        res.send('Could not find user with id ' + userId)
    }else {

        const match = users.findIndex(user => user.id === userId)
        if(match === -1) {
            res.status(404)
            res.send('No user found with id ' + userId)
        }else {
            res.status(200)
        const part1 = users.slice(match+1,users.length)
        const part2 = users.slice(0,match)
        users = part1.concat(part2)
        fs.writeFileSync('./users.json',JSON.stringify(users))
        res.send('Succesfuly deleted user with id ' + userId)
        }
    }
})

app.listen(PORT,() => {
    console.log('Listening on port ' + PORT)
})