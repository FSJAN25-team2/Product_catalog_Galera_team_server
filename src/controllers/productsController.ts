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

    const paginatedProducts = response.slice(startIndex, endIndex);

    switch (sortBy) {
      case Sorting.MostExpensive:
        paginatedProducts.sort((a, b) => b.price - a.price);
        break;

      case Sorting.Cheapest:
        paginatedProducts.sort((a, b) => a.price - b.price);
        break;

      case Sorting.Newest:
      default:
        paginatedProducts.sort((a, b) => b.year - a.year);
        break;
    }

    res.json(paginatedProducts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};
