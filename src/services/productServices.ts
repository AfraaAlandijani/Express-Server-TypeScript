import fs from "fs/promises";

import { Product, ProductInput } from "../types";

let products: Product[] = [
  {
    id: 1,
    name: "Laptop",
    image: "https://m.media-amazon.com/images/I/81KoSSAwH2L._SL1500_.jpg",
    description: "High-performance laptop for all your needs.",
    categories: [1, 2],
    variants: ["8GB RAM", "16GB RAM"],
    sizes: ["13-inch", "15-inch"],
    price: 1500,
  },
  {
    id: 2,
    name: "Smartphone",
    image: "https://m.media-amazon.com/images/I/81SigpJN1KL._SL1500_.jpg",
    description: "Latest smartphone with advanced features.",
    categories: [1, 3],
    variants: ["64GB", "128GB"],
    sizes: [],
    price: 700,
  },
];

export const findAllProducts = () => {
  return products;
};

export const findProductById = (id: number) => {
  const product = products.find((product) => product.id == id);
  return product;
};

export const deleteProduct = (id: number) => {
  products = products.filter((product) => product.id !== id);
  return products;
};

export const findProductByIndex = (id: number) => {
  const productIndex = products.findIndex((product) => product.id == id);
  return productIndex;
};

export const createProduct = async (newProduct: ProductInput) => {
  const id = new Date().getTime();
  const product = { id, ...newProduct };
  const existingProducts = JSON.parse(
    await fs.readFile("products.json", "utf-8")
  );
  existingProducts.push(product);
  await fs.writeFile("products.json", JSON.stringify(existingProducts));
  products.push(product);
  return product;
};

export const updateSingleProduct = async (
  productIndex: number,
  updatedProduct: ProductInput
) => {
  products[productIndex] = { ...products[productIndex], ...updatedProduct };
  return products[productIndex];
};
