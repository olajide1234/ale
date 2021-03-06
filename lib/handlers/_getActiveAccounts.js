/**
 * List all active accounts
 *
 * Not currently used
 * 
 */
const Book = require('../../models/book');
const { AleError, codes } = require('../errors');
exports.handler = function getAccounts(req, res, next) {
    let id = parseInt(req.params.bookId);
    Book.findById(id).then(book => {
        if (!book) {
            throw new AleError(`Book with id ${id} does not exist`, codes.BookDoesNotExist);
        }
        return book.listAccounts();
    }).then(accounts => {
        res.json({
            success: true,
            message: 'All active accounts returned',
            data: accounts
        })
    }).catch(err => {
        return next(err);
    });
};
