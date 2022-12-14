import { register, login } from "../../../services/Auth"
import { Router } from "express"

const router = Router()

router.route("/register").post( register )

router.route("/login").post( login )

export default router