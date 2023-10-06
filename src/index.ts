import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

// db.json file path

// Configure lowdb to write data to JSON file
type Data = {
    posts: Post[]
  }

type Post = {
    id: number,
    title: string
}  
// Extend Low class with a new `chain` field
  
const defaultData: Data = { posts: []}
const adapter = new JSONFile<Data>('db.json')
const db = new Low<Data>(adapter, defaultData)


const { posts } = db.data

// Finally write db.data content to file
async function run(){
    await db.read()
    console.log(db.data.posts[0])
    await db.write()
}
run()

