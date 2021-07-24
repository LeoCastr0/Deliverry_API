//Responsável por direcionar a solicitação para o controller

import express from "express";
import PedidosController from "../controllers/pedidos.controller.js"


const router = express.Router();

router.post("/", PedidosController.criarPedido);//passando função como parametro

router.put("/", PedidosController.atualizarPedido);

router.patch("/atualizarentrega", PedidosController.atualizarEntrega);//passando a função como parametro

router.get("/:id", PedidosController.getPedido);

router.delete("/:id", PedidosController.deletePedido);

router.post("/totalcliente", PedidosController.totalCliente);

router.post("/totalproduto", PedidosController.totalProduto);

router.post("/maisvendidos", PedidosController.maisVendidos);

router.use((err, req, res, next) => {
    global.logger.error(`${req.method} ${req.baseUrl} ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;