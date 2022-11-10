import { createContainer, getContainer, getContainers, deleteContainer } from "../../services/ContentContainer"
import { checkAuth } from "../../middlewares"
import Router from "express"

const router = Router()

router.route("/create").post( checkAuth, createContainer )

router.route("/").get( checkAuth, getContainer )

router.route("/all").get( checkAuth, getContainers )

router.route("/delete").delete( checkAuth, deleteContainer )

export default router