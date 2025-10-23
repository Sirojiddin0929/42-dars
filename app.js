import express from "express"
import mongoose from "mongoose"

const app=express()

const PORT=4000

async function bootstrap() {
    try{
          await mongoose.connect("mongodb:/localhost:27017")
          console.log("Database is connected successfully")
          app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`)
          })
    }catch(err){
        console.log("Xatolik",err)
    }
}
bootstrap()