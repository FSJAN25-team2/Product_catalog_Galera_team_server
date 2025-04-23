import { Request, Response } from "express";
import { products } from "../api/phones/products";
import { ProductDto } from "../dtos/product.dto";
import { Category, Sorting } from "../enums/enum";

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const {
      page = 1,
      limit = 16,
      category = Category.Phones,
      sortBy = Sorting.Newest,
    } = req.query;

    const currentPage = parseInt(page as string, 10);
    const itemsPerPage = parseInt(limit as string, 10);

    const response = products.filter(
      (product) => product.category === category
    );

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

    res.json(paginatedProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export const getHotPricedProducts = async (req: Request, res: Response) => {
  try {
    const { limit = 8 } = req.query;
    const response = products.map((product) => ({
      ...product,
      discount: product.fullPrice - product.price,
    }));

    response.sort((a, b) => b.discount - a.discount);

    const sliced = response.slice(0, +limit);

    res.json(sliced);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};
