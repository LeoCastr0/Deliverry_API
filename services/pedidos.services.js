import PedidosRepository from "../repositories/pedidos.repository.js";

async function criarPedidos(pedido){
    return await PedidosRepository.criarPedidos(pedido);
}

async function atualizarPedido(pedido){
    return await PedidosRepository.atualizarPedido(pedido);
}

async function atualizarEntrega(pedido){
    const ped = await PedidosRepository.getPedido(pedido.id);
    ped.entregue = pedido.entregue;
    await PedidosRepository.atualizarPedido(ped);
}

async function getPedido(id){
    return await PedidosRepository.getPedido(id);
}

async function deletePedido(id){
    return await PedidosRepository.deletePedido(id);
}

async function totalCliente(cliente){
    const pedidos = await PedidosRepository.getPedidos();
    return pedidos.filter(p => p.cliente === cliente && p.entregue).map(p => p.valor).reduce((prev, curr)=> prev + curr, 0); 
}

async function totalProduto(produto){
    const pedidos = await PedidosRepository.getPedidos();
    
    return pedidos.filter(p => p.produto === produto && p.entregue).map(p => p.valor).reduce((prev, curr)=> prev + curr, 0); 
}

async function maisVendidos(){
    const pedidos = await PedidosRepository.getPedidos();
    const lista = [];
    pedidos
    .filter (p => p.entregue)
    .forEach(p => {
        const index = lista.findIndex(it => it.produto === p.produto);
        if(index === -1){
            lista.push({produto: p.produto, quantidade: 1});
        }else{
            lista[index].quantidade++
        }
    });
    lista.sort ((a, b) => b.quantidade - a.quantidade);
    return lista.map(p => `${p.produto} - ${p.quantidade}`);
}

export default {
    criarPedidos,
    atualizarPedido,
    atualizarEntrega,
    getPedido,
    deletePedido,
    totalCliente,
    totalProduto,
    maisVendidos    
}