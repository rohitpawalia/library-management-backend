import { Router } from "express";
import { getBooks, createBook, findBook, updateBook, deleteBook, borrowBook, returnBook } from "../controllers/bookController";

const router = Router();
router.get("/books", getBooks);
router.post("/books", createBook );
router.get("/books/:id", findBook);
router.put("/books/:id", updateBook);
router.delete("/books/:id", deleteBook);
router.post("/books/:id/borrow", borrowBook);
router.post("/books/:id/return", returnBook);

export default router;