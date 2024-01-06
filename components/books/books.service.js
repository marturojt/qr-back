const db = require('_helpers/db');
const { Op } = require('sequelize');

module.exports = {
    getBooks,
    getBookByID,
    getBookFile
};

// Find all books ordered by title
async function getBooks() {
    const books = await db.Books.findAll({
        attributes: { exclude: ['cover', 'KindleFile', 'PDFFile', 'EPUBFile'] },
        order: [['title', 'DESC']]
    });
    return books;
}

// Find all books ordered by title
async function getBookByID(params) {
    const book = await db.Books.findAll({
        where: {
            BookID: params.BookID
        }
    });
    return book;
}

// Get specific book file
async function getBookFile(params) {
    // Tipos:
    // 1 -> Kindle, 2 -> PDF, 3-> EPUB
    switch (+params.tipo) {
        case 1:
            var file = await db.Books.findOne({
                attributes: ['BookID', ['KindleFile', 'file']],
                where: {
                    BookID: params.BookID
                }
            });
            break;
        case 2:
            var file = await db.Books.findOne({
                attributes: ['BookID', ['PDFFile', 'file']],
                where: {
                    BookID: params.BookID
                }
            });
            break;
        case 3:
            var file = await db.Books.findOne({
                attributes: ['BookID', ['EPUBFile', 'file']],
                where: {
                    BookID: params.BookID
                }
            });
            break;
    }
    return file;
}