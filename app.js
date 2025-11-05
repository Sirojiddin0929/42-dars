import express from "express"
import dotenv from "dotenv"
import {errorHandler} from './src/middleware/errorHandler.js'
import { dbconnect } from "./src/db/index.js"
import { config } from "./src/config/index.js"
import morgan from "morgan"
import Mainrouter from './src/routes/index.js'
import AuthRouter from "./src/routes/auth.routes.js"
import logger from "./src/helper/logger.js"

dotenv.config()
const app=express()
app.use(express.json())

app.use((req,res,next)=>{
    logger.info(`${req.method} ${req.originalUrl}`)
    next()
})
app.use(morgan('tiny'))

app.use('/api',Mainrouter)
app.use('/api',AuthRouter)
app.use(errorHandler)


async function bootstrap(){
    try{
        await dbconnect()
        app.listen(config.app.port,()=>{
            logger.info(`Server running on port ${config.app.port}`)
        })
    }catch(error){
        logger.error(error.message)
    }
}

bootstrap()

