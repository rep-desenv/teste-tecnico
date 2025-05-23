import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import * as categoriaController from "../controllers/categoria-controller"

const router = Router()

router.get("/categorias", categoriaController.getCategorias)
router.get("/categoria/:id", categoriaController.getCategoria)
router.put("/categoria/:id", categoriaController.updateCategoria)
router.post("/categoria", categoriaController.createCategoria)
router.delete("/categoria/:id", categoriaController.deleteCategoria)

export default router