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
})

server.get('/api/users/:id', async (req,res) => {
    try{
        const user = await Users.findById(req.params.id)
        res.json(user)
    } catch (err){
        res.status(500).json({
            error:err.message
        })
        }
})
// [POST] /api/dogs (C of CRUD, create new dog from JSON payload)

server.post('/api/users', async (req, res)=> {
    try{
        const newUser = await Users.insert(req.body)
        res.status(201).json(newUser)
    } catch (err){
        res.status(500).json({
            error: err.message
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
                message: 'dog by id does not exist'
            })
        } else {
            res.json(updatedUser)
        }
    } catch(err) {
    
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
