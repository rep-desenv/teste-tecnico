import { Router } from "express"
import categoriaRouter from "./categoria-routes"
import produtoRouter from "./produto-routes"


const route: Router = Router()

route.use(`/api/${process.env.VERSAO}/`, categoriaRouter)
route.use(`/api/${process.env.VERSAO}/`, produtoRouter)

export default route