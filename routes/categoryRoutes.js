import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  categoryControlller,
  createCategoryController,
  deleteCategoryCOntroller,
  singleCategoryController,
  updateCategoryController,
} from "./../controllers/categoryController.js";

const router = express.Router();

/**
 * @swagger
 * /api/v1/category/create-category:
 *   post:
 *     summary: Create a new category
 *     tags: [Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the category
 *               slug:
 *                 type: string
 *                 description: Slug for the category
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400:
 *         description: Bad request
 */
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

/**
 * @swagger
 * /api/v1/category/update-category/{id}:
 *   put:
 *     summary: Update an existing category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Updated name of the category
 *               slug:
 *                 type: string
 *                 description: Updated slug for the category
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad request
 */
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

/**
 * @swagger
 * /api/v1/category/get-category:
 *   get:
 *     summary: Get all categories
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/get-category", categoryControlller);

/**
 * @swagger
 * /api/v1/category/single-category/{slug}:
 *   get:
 *     summary: Get a single category by slug
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *         description: The category slug
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *       400:
 *         description: Bad request
 */
router.get("/single-category/:slug", singleCategoryController);

/**
 * @swagger
 * /api/v1/category/delete-category/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400:
 *         description: Bad request
 */
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryCOntroller
);

export default router;
