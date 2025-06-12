import { Router } from "express";
import createWaste from "../handlers/waste/createWaste.js";

const wasteRoutes = Router();

wasteRoutes.post("/create", createWaste)

export default wasteRoutes