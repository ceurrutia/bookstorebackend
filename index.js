import express, { response } from "express"
import { PORT, mongoDBURL} from "./config.js"
import mongoose from "mongoose"
import { Book } from "./models/bookModel.js"
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'
import dotenv from 'dotenv';


const app = express()

//middleware
//Handling cors policy for all *
// app.use(cors())

//option 2 cors

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
 }))

app.use(express.json())

app.get("/", (request, response) => {
    console.log(request)
    return response.status(234).send("<h1>Admin </h1>")
})

//refactor

app.use('/books', booksRoute)

//mongoose connection

mongoose
.connect(mongoDBURL)
.then(()=> {
    console.log("App connected to database correctly")
    app.listen(PORT, ()=> {
        console.log(`App is listening on port ${ PORT }`)
    })
})
.catch((error)=> {
    console.log(error)
})





