import express from "express";
import {
    /*brainTreePaymentController,
    braintreeTokenController,*/
    createProductController,
    deleteProductController,
    getProductController,
    getSingleProductController,
    productCategoryController,
    productCountController,
    productFiltersController,
    productListController,
    productPhotoController,
    realtedProductController,
    searchProductController,
    updateProductController,
} from "../controllers/productController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";

const router = express.Router();

/**
 * @swagger
 * /api/v1/product/create-product:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               quantity:
 *                 type: number
 *               photo:
 *                 type: string
 *                 format: binary
 *               shipping:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product created successfully
 *       400:
 *         description: Bad request
 */
router.post(
    "/create-product",
    requireSignIn,
    isAdmin,
    formidable(),
    createProductController
);

/**
 * @swagger
 * /api/v1/product/update-product/{pid}:
 *   put:
 *     summary: Update an existing product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               slug:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               quantity:
 *                 type: number
 *               photo:
 *                 type: string
 *                 format: binary
 *               shipping:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request
 */
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    formidable(),
    updateProductController
);

/**
 * @swagger
 * /api/v1/product/get-product:
 *   get:
 *     summary: Get all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/get-product", getProductController);

/**
 * @swagger
 * /api/v1/product/get-product/{slug}:
 *   get:
 *     summary: Get a single product by slug
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The product slug
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/get-product/:slug", getSingleProductController);

/**
 * @swagger
 * /api/v1/product/product-photo/{pid}:
 *   get:
 *     summary: Get the photo of a product by ID
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Photo fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/product-photo/:pid", productPhotoController);

/**
 * @swagger
 * /api/v1/product/delete-product/{pid}:
 *   delete:
 *     summary: Delete a product
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete("/delete-product/:pid", deleteProductController);

/**
 * @swagger
 * /api/v1/product/product-filters:
 *   post:
 *     summary: Filter products
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               filters:
 *                 type: object
 *     responses:
 *       200:
 *         description: Products filtered successfully
 *       400:
 *         description: Bad request
 */
router.post("/product-filters", productFiltersController);

/**
 * @swagger
 * /api/v1/product/product-count:
 *   get:
 *     summary: Get the count of all products
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: Product count fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/product-count", productCountController);

/**
 * @swagger
 * /api/v1/product/product-list/{page}:
 *   get:
 *     summary: Get a list of products per page
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *         description: The page number
 *     responses:
 *       200:
 *         description: Product list fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/product-list/:page", productListController);

/**
 * @swagger
 * /api/v1/product/search/{keyword}:
 *   get:
 *     summary: Search for products
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: true
 *         schema:
 *           type: string
 *         description: The search keyword
 *     responses:
 *       200:
 *         description: Products searched successfully
 *       400:
 *         description: Bad request
 */
router.get("/search/:keyword", searchProductController);

/**
 * @swagger
 * /api/v1/product/related-product/{pid}/{cid}:
 *   get:
 *     summary: Get related products
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Related products fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/related-product/:pid/:cid", realtedProductController);

/**
 * @swagger
 * /api/v1/product/product-category/{slug}:
 *   get:
 *     summary: Get products by category slug
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The category slug
 *     responses:
 *       200:
 *         description: Products by category fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/product-category/:slug", productCategoryController);

/**
 * @swagger
 * /api/v1/product/braintree/token:
 *   get:
 *     summary: Get Braintree token
 *     tags: [Payment]
 *     responses:
 *       200:
 *         description: Token fetched successfully
 *       400:
 *         description: Bad request
 */
/*
router.get("/braintree/token", braintreeTokenController);*/

/**
 * @swagger
 * /api/v1/product/braintree/payment:
 *   post:
 *     summary: Process Braintree payment
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               paymentMethodNonce:
 *                 type: string
 *                 description: Payment method nonce
 *               amount:
 *                 type: number
 *                 description: Payment amount
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *       400:
 *         description: Bad request
 */
/*
router.post("/braintree/payment", requireSignIn, brainTreePaymentController);
*/
export default router;
