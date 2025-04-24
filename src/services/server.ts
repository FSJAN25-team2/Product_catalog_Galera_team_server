import express from "express";
import phoneRoutes from "../routes/phoneRoutes";
import tabletRoutes from "../routes/tabletRoutes";
import productsRoutes from "../routes/productsRoute";
import cors from "cors";
import accessoriesRoutes from "../routes/accessoriesRoutes";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/products", productsRoutes);
app.use("/api/phones", phoneRoutes);
app.use("/api/tablets", tabletRoutes);
app.use("/api/accessories", accessoriesRoutes);


app.get("/", (req, res) => {
  res.send("Phone API is running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});