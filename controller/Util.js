module.exports = {

    ordenaItem(lista){
        lista.sort((a, b) =>{
            return b.quantidade_item - a.quantidade_item;
        });
        return lista;
    }   
}
