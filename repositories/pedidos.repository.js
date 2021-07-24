import {promises as fs} from "fs";
const {readFile, writeFile} = fs //destructing -> podemos utilizar os metodos sem o fs

async function criarPedidos(pedido){
    const data = JSON.parse(await readFile(global.fileName));

    pedido = {
        id: data.nextId ++,
        cliente: pedido.cliente,
        produto: pedido.produto,
        valor: pedido.valor,
        entregue: false,
        timestamp: new Date()
    }

    data.pedidos.push(pedido);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return pedido;
}

async function atualizarPedido(pedido){
    const data = JSON.parse(await readFile(global.fileName));
    const index = data.pedidos.findIndex(a => a.id === pedido.id);

    if (index === -1){
        throw new Error("Registro não encontrado");
    };

    data.pedidos[index].cliente = pedido.cliente;
    data.pedidos[index].produto = pedido.produto;
    data.pedidos[index].valor = pedido.valor;
    data.pedidos[index].entregue = Boolean(pedido.entregue);
    await writeFile (global.fileName, JSON.stringify(data, null, 2));

    return data.pedidos[index];

}

async function getPedido(id){
    const data = JSON.parse(await readFile(global.fileName));
    const pedido = data.pedidos.find(pedido => pedido.id === parseInt(id));

    if(pedido){
        return pedido;
    }

    throw new Error("Registro não encontrado.");
}

async function deletePedido(id){
    const data = JSON.parse(await readFile(global.fileName));
    data.pedidos = data.pedidos.filter(pedido =>
        pedido.id !== parseInt(id))
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
}

async function getPedidos(){
    const data = await JSON.parse(await readFile(global.fileName));
    return data.pedidos;
}

export default {
    criarPedidos,
    atualizarPedido,
    getPedido,
    deletePedido,
    getPedidos
};