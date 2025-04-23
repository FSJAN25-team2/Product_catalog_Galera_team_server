import { Request, Response } from "express";
import { accessories } from "../api/phones/accessories";

export const getAccessoriesById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const accessory = accessories.find((accessoriesItem) => accessoriesItem.id === id);
    if (!accessory) {
      res.status(404).json({ message: "Phone not found" });
    } else {
      res.json(accessory);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching accessories" });
  }
};
