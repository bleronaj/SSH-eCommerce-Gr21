import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
  updateProfileController,
  getOrdersController,
  getAllOrdersController,
  orderStatusController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//router object
const router = express.Router();

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 */
router.post("/register", registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", loginController);

/**
 * @swagger
 * /api/v1/auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               answer:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Bad request
 */
router.post("/forgot-password", forgotPasswordController);

/**
 * @swagger
 * /api/v1/auth/test:
 *   get:
 *     summary: Test route for admin
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Test route working
 *       401:
 *         description: Unauthorized
 */
router.get("/test", requireSignIn, isAdmin, testController);

/**
 * @swagger
 * /api/v1/auth/user-auth:
 *   get:
 *     summary: Protected route for user authentication
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

/**
 * @swagger
 * /api/v1/auth/admin-auth:
 *   get:
 *     summary: Protected route for admin authentication
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Admin authenticated successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

/**
 * @swagger
 * /api/v1/auth/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               address:
 *                 type: string
 *               answer:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Bad request
 */
router.put("/profile", requireSignIn, updateProfileController);

/**
 * @swagger
 * /api/v1/auth/orders:
 *   get:
 *     summary: Get user orders
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Orders fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/orders", requireSignIn, getOrdersController);

/**
 * @swagger
 * /api/v1/auth/all-orders:
 *   get:
 *     summary: Get all orders (admin)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: All orders fetched successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

/**
 * @swagger
 * /api/v1/auth/order-status/{orderId}:
 *   put:
 *     summary: Update order status
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: ["Not Process", "Processing", "Shipped", "Delivered", "Cancelled"]
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Bad request
 */
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController);

export default router;
