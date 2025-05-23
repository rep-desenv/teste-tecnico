import { Prisma, PrismaClient, Categorias } from "@prisma/client";
import AppError from "../errors/app-error";

const prisma = new PrismaClient()

export const getCategorias = async () => {
    return await prisma.categorias.findMany()
}

export const getCategoria = async (categoriaId: number): Promise<Categorias | null> => {

    const user = await prisma.categorias.findUnique({
        where: { id: categoriaId },
    });

    return user;

};

export const updateCategoria = async (categoriaId: number, dados: Categorias) => {

    const categ = await getCategoria(categoriaId)
    /*
    * Só para garantir que outro usuário não tenha delatado o registro
    */
    if(!categ){
        throw new AppError("Categoria não encontrado na base de dados.", 401);
    }

    /*
    * Valido se o nome informado já foi cadastrado.
    */  
   console.log('Antes da Alteração:', categ.nome)
   console.log('Depois da Alteração:', dados.nome)
   
    if (categ.nome != dados.nome){  
        await validaCategoriaNome(dados.nome)
    }

    const updateCategoria = await prisma.categorias.update({
        where: {id: categoriaId},
        data:{
            createdAt: dados.createdAt,
            updatedAt: dados.updatedAt,
            nome: dados.nome
        }
    })

    return updateCategoria

}

export const createCategoria = async (dados: Categorias) => { 

    await validaCategoriaNome(dados.nome)

    const createCategoria = await prisma.categorias.create({
        data: {
            createdAt: dados.createdAt,
            updatedAt: dados.updatedAt,
            nome: dados.nome
        }
    })
    
    return createCategoria

}

export const deleteCategoria = async(categoriaId: number)=>{

    const categ = await getCategoria(categoriaId)

    if(!categ){
        throw new AppError("Categoria não encontrada na base de dados.", 401);
    }

    const deleteUser = await prisma.categorias.delete({
        where: { id: categoriaId}
    })

    return deleteCategoria

}

const validaCategoriaNome = async (name: string) => {

    const nameCategoria = await prisma.categorias.findMany({
        where: { nome: name },
    });

    if(nameCategoria.length > 0){
        throw new AppError("Categoria já cadastrado na base de dados.", 401);
    }

}
