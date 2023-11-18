import { Router } from "express";
import {
    addProducts,
    deleteProducts,
  getAllProducts, getSingleProducts, updateProduct,
} from "../controllers/productsController";

const productsRouter = Router();

productsRouter.get("/", getAllProducts);
productsRouter.get("/:id", getSingleProducts);
productsRouter.post("/", addProducts);
productsRouter.delete("/:id", deleteProducts);
productsRouter.put("/:id", updateProduct);

export default productsRouter;
