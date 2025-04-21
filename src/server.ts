import express from "express";
import phoneRoutes from "./routes/phoneRoutes";
import tabletRoutes from "./routes/tabletRoutes";
import cors from "cors";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use("/api/phones", phoneRoutes);
app.use("/api/tablets", tabletRoutes);

app.get("/", (req, res) => {
  res.send("Phone API is running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});