import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import * as produtoController from "../controllers/produto-controller"

const router = Router()

router.get("/produtos", produtoController.getProdutos)
router.get("/produto/:id", produtoController.getProduto)
router.put("/produto/:id", produtoController.updateProduto)
router.post("/produto", produtoController.createProduto)
router.delete("/produto/:id", produtoController.deleteProduto)

export default router