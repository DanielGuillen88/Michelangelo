import { Router } from "express";
import createWaste from "../handlers/waste/createWaste.js";
import getWasteCustom from "../handlers/waste/getWasteCustom.js";
import deleteWaste from "../handlers/waste/deleteWaste.js";

const wasteRoutes = Router();

wasteRoutes.post("/create", createWaste);

wasteRoutes.get("/", getWasteCustom);

wasteRoutes.delete("/delete/:id", deleteWaste);

export default wasteRoutes