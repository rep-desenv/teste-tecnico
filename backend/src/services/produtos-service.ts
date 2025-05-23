import { Prisma, PrismaClient, Categorias, Produtos } from "@prisma/client";
import AppError from "../errors/app-error";

const prisma = new PrismaClient()

export const getProdutos = async () => {
    //return await prisma.produtos.findMany()

    return await prisma.produtos.findMany({
        include: { categoria: true },
      });
      
}


export const getProduto = async (produtoId: number): Promise<Produtos | null> => {

    const user = await prisma.produtos.findUnique({
        where: { id: produtoId },
    });

    return user;

};


export const updateProduto = async (produtoId: number, dados: Produtos) => {
    
    /*
    * Só para garantir que outro usuário não tenha delatado o registro.
    */
    const prod = await getProduto(produtoId)
    if(!prod){
        throw new AppError("Produto não encontrado na base de dados.", 401);
    }

    /*
    * Valido se o nome informado já foi cadastrado.
    */  
   console.log('Antes da Alteração:', prod.nome)
   console.log('Depois da Alteração:', dados.nome)
   
    if (prod.nome != dados.nome){  
        await validaProdutoNome(dados.nome)
    }
  
    /*
    * Valido a categoria para garantir que a aplicação não vai "crashar".
    */
   console.log('Validar categoria>>>>',dados.categoriaId)
    await validaCategoria(dados.categoriaId)
    

    const updateProduto = await prisma.produtos.update({
        where: {id: produtoId},
        data:{
            createdAt: dados.createdAt,
            updatedAt: dados.updatedAt,
            nome: dados.nome,
            preco: dados.preco,
            categoriaId: dados.categoriaId
        }
    })

    return updateProduto

}

export const createProduto = async (dados: Produtos) => { 

    await validaProdutoNome(dados.nome)

    const createProduto = await prisma.produtos.create({
        data: {
            createdAt: dados.createdAt,
            updatedAt: dados.updatedAt,
            nome: dados.nome,
            preco: dados.preco,
            categoriaId: dados.categoriaId
        }
    })
    
    return createProduto

}

export const deleteProduto = async(produtoId: number)=>{

    const prod = await getProduto(produtoId)

    if(!prod){
        throw new AppError("Produto não encontrado na base de dados.", 401);
    }

    const deleteUser = await prisma.produtos.delete({
        where: { id: produtoId}
    })

    return deleteUser

}


const validaProdutoNome = async (name: string) => {

    const nameProduto = await prisma.produtos.findMany({
        where: { nome: name },
    });

    if(nameProduto.length > 0){
        throw new AppError("Produto já cadastrado na base de dados.", 401);
    }

    
}

const validaCategoria = async (categoriaId: number) => {

    const nameCategoria = await prisma.categorias.findMany({
        where: { id: categoriaId },
    });

    if(nameCategoria.length <= 0){
        throw new AppError("Categoria não encontrada.", 401);
    }

}
