import { getTypes } from "../../services/Types"
import { Router } from "express"

const router = Router()

router.route("/").get(getTypes)

export default router