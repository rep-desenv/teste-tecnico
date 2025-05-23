import { StatusCodes } from "http-status-codes";
import { Prisma, Categorias } from "@prisma/client";
import exmpress, { Request, Response, NextFunction} from "express"
import * as categoriaService from "../services/categorias-service"
import { json } from "body-parser"


export async function  getCategorias( req: Request, res: Response, next: NextFunction){
    await categoriaService.getCategorias().then((dados)=>   {
        res.status(200).json(dados)
    }).catch((e)=>{
        res.status(e.statusCode).json({message: e.message})
    })
}

export async function getCategoria(req: Request, res: Response, next: NextFunction) {
    await categoriaService.getCategoria(Number(req.params.id)).then((dados)=>{
        res.status(200).json(dados)
    }).catch((e)=>{
        res.status(e.status).json({ message: e.message})
        next(e)
    })
}

export async function updateCategoria(req: Request, res:Response, next:NextFunction){
    const insert = await categoriaService.updateCategoria( Number(req.params.id), req.body).then((dados)=>{
      
      console.log('Retorno: ', dados)
      res.status(200).json(dados)   
    
    }).catch ((e)=>{
  
      console.log(e)
  
      res.status(e.statusCode).json({message: e.message})
   
      next(e)
    
    })
  }


export async function createCategoria(req: Request, res:Response, next:NextFunction){
    const insert = await categoriaService.createCategoria( req.body).then((retorno)=>{
    
      console.log('Retorno: ', retorno)
      res.status(201).json(retorno)   
    
    }).catch ((e)=>{
      
      console.log(e)

      res.status(e.statusCode).json({message: e.message})

      next(e)
    
    }) 
}


export async function deleteCategoria( req: Request, res:Response, next:NextFunction){  
    const user = await categoriaService.deleteCategoria(Number(req.params.id)).then((retorno)=>{
      
      console.log('Retorno: ', retorno)
      res.status(204).json(retorno)  
    
    }).catch ((e)=>{
  
      console.log(e)
  
      res.status(e.statusCode).json({message: e.message})

      next(e)
    
      })        
  }