import { reach, object, number, string, ObjectSchema } from 'yup';
import Express  from 'express'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import {schema } from './validation'


type Data = {
    persons: Person[]
}

type Person = {
    id: number,
    firstname: string
    lastname: string
} 


reach(schema,'db.data.persons')

const defaultData: Data = { persons: []}
const adapter = new JSONFile<Data>('db.json')
const db = new Low<Data>(adapter, defaultData)
const app = Express()
const port = 3000

app.get('/persons', async (req, res) => {
    await db.read()
    res.send(db.data.persons)
})

app.get('/persons/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    await db.read()
    const found = db.data.persons.find((person) => person.id == id);

    if (found == null){
        res.status(404).send();
        return
    }
    res.send(found)
})



app.delete('/persons/:id', async function(req, res){
    const id = parseInt(req.params.id)
    await db.read

    const personIndex = db.data.persons.findIndex(person => person.id == id)
    if (personIndex == -1){
        res.sendStatus(404)
    }
})

app.post('/users', async function(req, res){
    try{
        const id = parseInt(req.params.id)
        const data = await schema.validate(req.body)
        await db.read()
        db.data.persons.push({id: db.data.persons[db.data.persons.length-1],...data})
        await db.write
        res.status(201).json({message: 'Requete post  reussie'})
    }catch{
        res.status(400)
    }
})


app.patch('/persons/:id', async function(req, res){
    const id = parseInt(req.params.id)
    const foundPersonsId = db.data.persons.findIndex((person) => person.id == id )
    await db.write()
})




const { persons } = db.data

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Finally write db.data content to file
// async function run(){
//     await db.read()
//     console.log(db.data.posts[0])
//     await db.write()
// }
// run()

