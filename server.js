import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import swaggerApp from "./swaggerConfig.js";
import reviewRoutes from './routes/reviewRoutes.js'; 
import wishListRoutes from './routes/wishListRoutes.js'; 
import addressRoutes from './routes/addressRoutes.js'; 
import notificationRoutes from './routes/notificationRoutes.js'; 

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use('/api/v1/review', reviewRoutes); 
app.use('/api/v1/wishlist', wishListRoutes); 
app.use('/api/v1/address', addressRoutes); 
app.use('/api/v1/notifications', notificationRoutes); 

// Use Swagger
app.use(swaggerApp);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to ecommerce app</h1>");
});

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
