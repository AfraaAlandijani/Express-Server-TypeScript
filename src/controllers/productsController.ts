import fs from "fs/promises";
import { Request, Response, NextFunction } from "express";
import * as productService from "../services/productServices";
import { ProductInput } from "../types";

export const getAllProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const products = productService.findAllProducts();
    res.json({
      message: "return all the products",
      payload: products,
    });
  } catch (error) {
    next(error);
  }
};

export const getSingleProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    console.log(id);
    const product = productService.findProductById(id);
    if (!product) {
      const error = new Error(`Product not found with the id ${id}`);
      res.statusCode = 404;
      throw error;
    }
    res.json({
      message: `Single Product is returned with the id ${id}`,
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    let product = productService.findProductById(id);
    if (!product) {
      const error = new Error(`Product not found with the id ${id}`);
      res.statusCode = 404;
      throw error;
    }
    const filteredProducts = productService.deleteProduct(id);
    const products = filteredProducts;
    res.json({
      message: `Single Product is deleted with the id ${id}`,
      payload: products,
    });
  } catch (error) {
    next(error);
  }
};

export const addProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newProduct: ProductInput = req.body;
    const product = productService.createProduct(newProduct);
    res.json({
      message: "New Products is added",
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const productIndex = productService.findProductByIndex(id);
    if (productIndex == -1) {
      const error = new Error(`Product not found with the id ${id}`);
      res.statusCode = 404;
      throw error;
    }
    const updatedProduct: ProductInput = req.body;
    const product = productService.updateSingleProduct(
      productIndex,
      updatedProduct
    );
    res.json({
      message: `Single Product is updated with the id ${id}`,
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};
