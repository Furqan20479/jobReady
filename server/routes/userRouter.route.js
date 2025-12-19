import express from "express";
const router = express.Router();

import {
  doRegister,
  doLogin,
  profile,
} from "../controller/userData.controller.js";

router.post("/doRegister", doRegister);
router.post("/doLogin", doLogin);
router.get("/profile/:sessionID", profile);

export default router;
