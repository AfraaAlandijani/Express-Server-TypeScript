export type Product = {
        id: number;
        name: string;
        image: string;
        description: string;
        categories: number[];
        variants: string[];
        sizes: string[];
        price: number;
}

export type ProductInput = Omit<Product,'id'>;