// BUILD YOUR SERVER HERE
const express = require('express')
const Users = require('./users/model')

const server = express()

server.use(express.json())

server.get('/api/users', (req, res)=> {
    Users.find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({
             message: "The users information could not be retrieved" 
        })
    })
})

server.get('/api/users/:id', async (req,res) => {
    try{
        const user = await Users.findById(req.params.id)
        if(!user){
            res.status(404).json({
                message: "The user with the specified ID does not exist" 
            })
        }else{
        res.json(user)
        }
    } catch (err){
        res.status(500).json({
            message: "The user could not be removed"
        })
        }
})
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)

server.post('/api/users', async (req, res)=> {
    try{
        if(!req.body.name || !req.body.bio){
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        }else{
        const newUser = await Users.insert(req.body)
        res.status(201).json(newUser)
        }
    } catch (err){
        res.status(500).json({
            message: "There was an error while saving the user to the database" 
        })
    }
})
// [PUT] /api/dogs/:id (U of CRUD, update dog with :id using JSON payload)
server.put('/api/users/:id', async( req, res) => {
    const {id} = req.params
    const { body } = req

    try{
        const updatedUser = await Users.update(id, body)
        if(!updatedUser){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        } else if(!req.body.name || !req.body.bio) {
            res.status(400).json({
                message: "Please provide name and bio for the user"
            })
        } else {
            res.json(updatedUser)
        }
    } catch(err) {
        res.status(500).json({
            message: "The user information could not be modified"
        })
    }
})
// [DELETE] /api/dogs/:id (D of CRUD, remove dog with :id)
server.delete('/api/users/:id', async (req,res) => {
    const {id} = req.params

    Users.remove(id)
    .then(deletedUser => {
        if(!deletedUser){
            res.status(404).json({
                message: `dog by ${id} does not exist`
            })
        }else{
            res.json(deletedUser)
        }
    })
    .catch(err => {
        res.status(500).json({
            message: 'error',
            error:err.message
        })
    })
})

module.exports = server // EXPORT YOUR SERVER instead of {}
