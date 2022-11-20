import { Router } from "express";
import { createEntity, getEntities } from "../../services/Entity"
import { checkAuth } from "../../middlewares"

const router = Router()

router.route("/create").post( checkAuth, createEntity )

router.route("/all").get( checkAuth, getEntities )

export default router