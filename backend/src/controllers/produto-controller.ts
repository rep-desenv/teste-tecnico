import { StatusCodes } from "http-status-codes";
import { Prisma, Categorias, Produtos } from "@prisma/client";
import exmpress, { Request, Response, NextFunction} from "express"
import * as produtosService from "../services/produtos-service"
import { json } from "body-parser"


export async function  getProdutos( req: Request, res: Response, next: NextFunction){
    await produtosService.getProdutos().then((dados)=>   {
        res.status(200).json(dados)
    }).catch((e)=>{
        res.status(e.statusCode).json({message: e.message})
    })
}

export async function getProduto(req: Request, res: Response, next: NextFunction) {
    await produtosService.getProduto(Number(req.params.id)).then((dados)=>{
        res.status(200).json(dados)
    }).catch((e)=>{
        res.status(e.status).json({ message: e.message})
        next(e)
    })
}

export async function updateProduto(req: Request, res:Response, next:NextFunction){
    const insert = await produtosService.updateProduto( Number(req.params.id), req.body).then((dados)=>{
      
      console.log('Retorno: ', dados)
      res.status(200).json(dados)   
    
    }).catch ((e)=>{
  
      console.log(e)
  
      res.status(e.statusCode).json({message: e.message})
   
      next(e)
    
    })
  }


  export async function createProduto(req: Request, res:Response, next:NextFunction){
      const insert = await produtosService.createProduto( req.body).then((retorno)=>{
      
        console.log('Retorno: ', retorno)
        res.status(201).json(retorno)   
      
      }).catch ((e)=>{
        
        console.log(e)
  
        res.status(e.statusCode).json({message: e.message})
  
        next(e)
      
      }) 
  }
  

  export async function deleteProduto( req: Request, res:Response, next:NextFunction){  
      const user = await produtosService.deleteProduto(Number(req.params.id)).then((retorno)=>{
        
        console.log('Retorno: ', retorno)
        res.status(204).json(retorno)  
      
      }).catch ((e)=>{
    
        console.log(e)
    
        res.status(e.statusCode).json({message: e.message})
  
        next(e)
      
        })        
    }