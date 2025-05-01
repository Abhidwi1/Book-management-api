const BookService = require('../services/bookService');

class BookController {
    static async createBook(req, res) {
        try {
            const book = BookService.createBook(req.body);
            res.status(201).json(book);
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    static async getBooks(req, res) {
        const { page, limit, sort, order } = req.query;
        const books = BookService.getPaginatedBooks({ page, limit, sort, order });
        res.json(books);
    }

    static async getBook(req, res) {
        const book = BookService.getBook(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    }

    static async updateBook(req, res) {
        const book = BookService.updateBook(req.params.id, req.body);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    }

    static async deleteBook(req, res) {
        const success = BookService.deleteBook(req.params.id);
        if (!success) return res.status(404).json({ error: 'Book not found' });
        res.status(204).send();
    }

    static async toggleFavorite(req, res) {
        const book = BookService.toggleFavorite(req.params.id);
        if (!book) return res.status(404).json({ error: 'Book not found' });
        res.json(book);
    }

    static async searchBooks(req, res) {
        const { q } = req.query;
        const results = BookService.searchBooks(q);
        res.json(results);
    }

    static async getFavorites(req, res) {
        const favorites = BookService.getFavorites();
        res.json(favorites);
    }
}

module.exports = BookController;