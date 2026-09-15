import { Request, Response } from "express";
import OpenAI from "openai";
import Book from "../models/book";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const recommendBook = async (
    req: Request,
    res: Response
) => {
    try {
        const { preference } = req.body;

        const books = await Book.find();

        const bookList = books.map((book) => ({
            title: book.title,
            author: book.author,
            genre: book.genre,
            publishedYear: book.publishedYear,
        }));

        const response = await openai.responses.create({
            model: "gpt-5.6-luna",
            instructions:
                "You are an AI librarian. Recommend books only from the user's library. Explain briefly why the recommendation matches the user's preference.",
            input: `
User preference:
${preference}

Books in the library:
${JSON.stringify(bookList)}
`,
        });

        return res.status(200).json({
            recommendation: response.output_text,
        });
    } catch (error) {
        console.error("AI recommendation error:", error);

        return res.status(500).json({
            message: "Could not generate recommendation",
        });
    }
};