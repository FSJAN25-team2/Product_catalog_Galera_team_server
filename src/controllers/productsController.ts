import { Request, Response } from "express";
import { products } from "../api/phones/products";
import { Category, Sorting } from "../enums/enum";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 16,
      category = Category.Phones,
      sortBy = Sorting.Newest,
      color,
      capacity,
      ram,
    } = req.query;

    const currentPage = parseInt(page as string, 10);
    const itemsPerPage = parseInt(limit as string, 10);

    let response = products.filter(
      (product) => product.category === category
    );

    const allColors = [...new Set(response.map((product) => product.color))];
    const allCapacity = [...new Set(response.map((product) => product.capacity)),];
    const allRam = [...new Set(response.map((product) => product.ram))];

    if (color) {
      const colorArr = (color as string).split(',');
      response = response.filter(product => colorArr.includes(product.color));
    }
    
    if (ram) {
      const ramArr = (ram as string).split(',');
      response = response.filter(product => ramArr.includes(product.ram));
    }
    
    if (capacity) {
      const capacityArr = (capacity as string).split(',');
      response = response.filter(product => capacityArr.includes(product.capacity));
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    switch (sortBy) {
      case Sorting.MostExpensive:
        response.sort((a, b) => b.price - a.price);
        break;

      case Sorting.Cheapest:
        response.sort((a, b) => a.price - b.price);
        break;

      case Sorting.Newest:
      default:
        response.sort((a, b) => b.year - a.year);
        break;
    }


    const paginatedProducts = response.slice(startIndex, endIndex);
    

    res.json({
      totalCount: response.length,
      products: paginatedProducts,
      allColors,
      allCapacity,
      allRam,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const getHotPricedProducts = async (req: Request, res: Response) => {
  try {
    const { limit = 8 } = req.query;

    const response = products
      .filter((product) => product.year !== 2022)
      .map((product) => ({
        ...product,
        discount: product.fullPrice - product.price,
      }));

    response.sort((a, b) => b.discount - a.discount);

    const sliced = response.slice(0, +limit);

    res.json(sliced);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hot priced products" });
  }
};

export const getProductById = (req: Request, res: Response): void => {
  const { id } = req.params;
  try {
    const product = products.find((product) => product.itemId === id);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};
