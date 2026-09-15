import { Request, Response } from "express";
import { bookSchema } from "../schemas/bookSchema";
import Book from "../models/book";
import axios from "axios";


export const getBooks = async (req: Request, res: Response) => {
    const books = await Book.find();

    return res.status(200).json(books);
};


export const createBook = async (req: Request, res: Response) => {

    const result = bookSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid entry",
            errors: result.error.issues
        });
    }

    const { title, author, genre, publishedYear } = result.data;

let coverUrl = "";

try {
    const searchUrl =
        `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}&fields=cover_i&limit=1`;

    const response = await axios.get(searchUrl);

    const coverId = response.data.docs[0]?.cover_i;

    if (coverId) {
        coverUrl = `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`;
    }
} catch (error) {
    console.log("Could not find book cover");
}

const book = await Book.create({
    title,
    author,
    genre,
    publishedYear,
    available: true,
    coverUrl
});

    return res.status(201).json({
        message: "Book created successfully",
        book
    });
};


export const findBook = async (req: Request, res: Response) => {

    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found",
        });
    }

    return res.status(200).json(book);
};


export const updateBook = async (req: Request, res: Response) => {

    const book = await Book.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true
        }
    );

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    return res.status(200).json({
        message: "Book updated successfully",
        book
    });
};


export const deleteBook = async (req: Request, res: Response) => {

    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    return res.status(200).json({
        message: "Book deleted successfully",
        book
    });
};


export const borrowBook = async (req: Request, res: Response) => {

    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    if (!book.available) {
        return res.status(400).json({
            message: "Book already borrowed"
        });
    }

    book.available = false;

    await book.save();

    return res.status(200).json({
        message: "Book borrowed successfully",
        book
    });
};

export const returnBook = async (req: Request, res: Response) => {
    const book = await Book.findById(req.params.id);

    if (!book) {
        return res.status(404).json({
            message: "Book not found"
        });
    }

    if (book.available) {
        return res.status(400).json({
            message: "Book is already available"
        });
    }

    book.available = true;

    await book.save();

    return res.status(200).json({
        message: "Book returned successfully",
        book
    });
};