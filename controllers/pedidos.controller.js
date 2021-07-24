import PedidosServices from "../services/pedidos.services.js"

async function criarPedido(req, res, next){
    try{
        let pedido = req.body;

        if(!pedido.cliente || !pedido.produto || pedido.valor == null){
            throw new Error("Cliente, produto e valor são obrigatórios.");
        }

        pedido = await PedidosServices.criarPedidos(pedido);

        res.send(pedido);
        logger.info("POST /pedidos");
    }catch(err){
        next(err);
    }
}

async function atualizarPedido(req, res, next){
    try{
        const pedido = req.body;

        if(!pedido.id || !pedido.cliente || pedido.valor == null || !pedido.produto || pedido.entregue == null){
            throw new Error ("ID, clien, valor, produto e entregue S/N devem ser preenchidos");
        }

        res.send(await PedidosServices.atualizarPedido(pedido));

        logger.info(`PUT /pedidos - ${JSON.stringify(pedido)}`);

    }catch(err){
        next(err);
    }
}

async function atualizarEntrega(req, res, next){
    try{
        const pedido = req.body;
        if(!pedido.id || pedido.entregue === null){
            throw new Error("ID e entrege são necessários");
        }
        res.send(await PedidosServices.atualizarEntrega(pedido));

        logger.info(`PATCH /pedidos/atualizarentrega ${JSON.stringify(pedido)}`);
    }catch(err){
        next(err);
    }
}

async function getPedido(req, res, next){
    try{
        res.send(await PedidosServices.getPedido(req.params.id));
        logger.info("GET / pedido/:id");
    }catch(err){
        next(err);
    }
}

async function deletePedido (req, res, next) {
    try{
        await PedidosServices.deletePedido(req.params.id);
        logger.info(`DELETE /pedidos/:id - ${req.params.id}`);
        res.end();

    }catch(err){
        next(err);
    }
};

async function totalCliente(req, res, next){
    try{
        const cliente = req.body.cliente;
        if (!cliente){
            throw new Error("Nome do cliente necessário!");
        }
        res.sendStatus(await PedidosServices.totalCliente(cliente));
        logger.info(`POST /pedidos/TotalCliente - ${cliente}`);

    }catch(err){
        next(err);
    }
};

async function totalProduto(req, res, next){
    try{
        const produto = req.body.produto;
        if (!produto){
            throw new Error("Nome do produto é necessário!");
        }
        const resultado = await PedidosServices.totalProduto(produto)
        res.sendStatus(resultado);
        logger.info(`POST /pedidos/TotalProduto - ${produto}`);

    }catch(err){
        next(err);
    }
};

async function maisVendidos(req, res, next){
    try{
        res.send(await PedidosServices.maisVendidos());
        logger.info('POST /pedidos/maisVendidos ');

    }catch(err){
        next(err);
    }
}

export default {
    criarPedido,
    atualizarPedido,
    atualizarEntrega,
    getPedido,
    deletePedido,
    totalCliente,
    totalProduto,
    maisVendidos    
};