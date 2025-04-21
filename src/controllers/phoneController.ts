import { Request, Response } from "express";
import { phones } from "../api/phones/phones";
import { ProductDto } from "../dtos/product.dto";

export const getAllPhones = async (req: Request, res: Response) => {
  try {
    res.json(phones as ProductDto[]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching phones" });
  }
};

export const getPhoneById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const phone = phones.find((phoneItem) => phoneItem.id === id);
    if (!phone) {
      res.status(404).json({ message: "Phone not found" });
    } else {
      res.json(phone);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching phone" });
  }
};
