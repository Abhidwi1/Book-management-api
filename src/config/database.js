const books = new Map();

function getAllBooks() {
    return Array.from(books.values()).filter(book => !book.isDeleted);
}

module.exports = { books, getAllBooks };