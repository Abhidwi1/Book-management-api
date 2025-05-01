const express = require('express');
const router = express.Router();
const BookController = require('../controllers/bookController');
const { validateBook, validateSearch } = require('../middleware/validation');

router.post('/books', validateBook, BookController.createBook);
router.get('/books', BookController.getBooks);
router.get('/books/:id', BookController.getBook);
router.put('/books/:id', validateBook, BookController.updateBook);
router.delete('/books/:id', BookController.deleteBook);
router.post('/books/:id/favorite', BookController.toggleFavorite);
router.delete('/books/:id/favorite', BookController.toggleFavorite);
router.get('/books/search', validateSearch, BookController.searchBooks);
router.get('/books/favorites', BookController.getFavorites);

module.exports = router;