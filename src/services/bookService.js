const { v4: uuidv4 } = require('uuid');
const { books } = require('../config/database');

class BookService {
    static createBook(data) {
        const id = uuidv4();
        const book = {
            id,
            ...data,
            rating: Number(data.rating),
            isFavorite: false,
            isDeleted: false,
            publishedDate: new Date(data.publishedDate)
        };
        books.set(id, book);
        return book;
    }

    static getBook(id) {
        const book = books.get(id);
        return book && !book.isDeleted ? book : null;
    }

    static updateBook(id, data) {
        const book = this.getBook(id);
        if (!book) return null;
        const updatedBook = { ...book, ...data, rating: Number(data.rating) };
        books.set(id, updatedBook);
        return updatedBook;
    }

    static deleteBook(id) {
        const book = this.getBook(id);
        if (book) {
            books.set(id, { ...book, isDeleted: true });
            return true;
        }
        return false;
    }

    static toggleFavorite(id) {
        const book = this.getBook(id);
        if (book) {
            const updatedBook = { ...book, isFavorite: !book.isFavorite };
            books.set(id, updatedBook);
            return updatedBook;
        }
        return null;
    }

    static searchBooks(searchTerm) {
        return Array.from(books.values())
            .filter(book => !book.isDeleted)
            .filter(book => 
                book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(searchTerm.toLowerCase())
            );
    }

    static getFavorites() {
        return Array.from(books.values())
            .filter(book => !book.isDeleted && book.isFavorite);
    }

    static getPaginatedBooks({ page = 1, limit = 10, sort, order = 'asc' }) {
        let result = Array.from(books.values()).filter(book => !book.isDeleted);
        
        if (sort) {
            result.sort((a, b) => {
                let comparison = 0;
                if (sort === 'publishedDate') {
                    comparison = new Date(a.publishedDate) - new Date(b.publishedDate);
                } else if (sort === 'rating') {
                    comparison = a.rating - b.rating;
                }
                return order === 'desc' ? -comparison : comparison;
            });
        }

        const startIndex = (page - 1) * limit;
        return result.slice(startIndex, startIndex + limit);
    }
}

module.exports = BookService;