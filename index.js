import express from "express";
import winston from "winston";
import pedidosRouter from "./routes/pedidos.route.js"
import {promises as fs} from "fs";
import cors from "cors";


/******************** configurando winston para gravar log ***************************/
const { combine, timestamp, label, printf } = winston.format;
const MyFormat = printf (({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});
global.logger = winston.createLogger({
    level: "silly",
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File) ({ filename: "Delivery_API.log" })
    ],
    format: combine (
        label ({ label: "Delivery_API" }),
        timestamp(),
        MyFormat
    )
});

/****************************************** Fim ******************************/

const {readFile, writeFile} = fs //destructing -> podemos utilizar os metodos sem o fs.

global.fileName = "pedidos.json" //definindo como global


const app = express();
app.use(express.json());
app.use(cors()); // instanciando o CORS para que paginas de outros servers possam consultar a API

app.use("/pedidos", pedidosRouter);

app.listen(3000, async () => {
    try{
        await readFile(global.fileName);
        logger.info("API Started !");
    } catch (err){
        const initialJson = {
            nextId: 1,
            pedidos: []
        }
        writeFile(global.fileName, JSON.stringify(initialJson)).then (() =>{
            global.logger.info("API Started and File created!");
        }).catch(err =>{
            global.logger.error(err);
        });
    }
});
