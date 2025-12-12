import express from "express";
const router = express.Router();

import { doRegister, doLogin } from "../controller/userData.controller.js";

router.post("/doRegister", doRegister);
router.post("/doLogin", doLogin);

export default router;


