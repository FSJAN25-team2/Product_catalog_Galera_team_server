import { Request, Response } from "express";
import { tablets } from "../api/phones/tablets";

export const getTabletById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const phone = tablets.find((tabletItem) => tabletItem.id === id);
    if (!phone) {
      res.status(404).json({ message: "Phone not found" });
    } else {
      res.json(phone);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching tablet" });
  }
};
