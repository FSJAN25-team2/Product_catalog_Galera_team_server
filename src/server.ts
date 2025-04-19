import express from "express";
import phoneRoutes from "./routes/phoneRoutes";

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use("/api", phoneRoutes);

app.get("/", (req, res) => {
  res.send("Phone API is running");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});