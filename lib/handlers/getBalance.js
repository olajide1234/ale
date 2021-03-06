/**
 * Get account balance
 *
 * GET: /books/{bookId}/balance
 * 
 * query:
 *   account {string} The account name to get the balance for.
 *   accountCode {string} The account code to get the balance for.
 *   inQuoteCurrency {boolean} If true (default), converts all values to the quote currency first.
 *   
 */
const Book = require('../../models/book');
const { AleError, codes } = require('../errors');

const checkAccountInQuery = require('../helpers/validateAccountInQuery')

exports.middleware = checkAccountInQuery;

exports.handler = function getBalance(req, res, next) {
    let id = parseInt(req.params.bookId);
    Book.findById(id).then(book => {
        if (!book) {
            throw new AleError(`Book with id ${id} does not exist`, codes.BookDoesNotExist);
        }
        const { account, perPage, page } = req.query;
        const inQuote = req.query.inQuoteCurrency !== false;
        return book.getBalance({ account, perPage, page }, inQuote);
    }).then(balance => {
        res.json({
            success: true,
            message: `Account balance for ${req.query.account} in book ${id}`,
            data: balance
        })
    }).catch(err => {
        return next(err);
    });
};

