import mongoose, { Schema, Document } from "mongoose";

export interface Book extends Document {
    title: string;
    author: string;
    genre: string;
    publishedYear: number;
    available: boolean;
    coverUrl: string;

}

const bookSchema = new Schema<Book>({
    title: {
        type: String,
        required: true
    },

    author: {
        type: String,
        required: true
    },

    genre: {
        type: String,
        required: true
    },

    publishedYear: {
        type: Number,
        required: true
    },

    available: {
        type: Boolean,
        default: true
    },

    coverUrl: {
        type: String,
        default: ""
    }
});

const Book = mongoose.model<Book>("Book", bookSchema);

export default Book;