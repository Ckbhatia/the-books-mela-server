const express = require('express');
const router = express.Router();
const BooksSearch = require("../models/books");

/* POST book search query. */
router.post('/', async (req, res, next) => {
  const searchQuery = req.body?.searchQuery;
  const userId = req.body?.userId;

  try {
    const bookSearches = await BooksSearch.find()
      .where('userId').equals(userId).exec();

    let response;

    if (bookSearches?.length > 0) {
      for (let bookSearch of bookSearches) {
        if (bookSearch?.searchString === searchQuery) {
          response = res.status(400).json({ message: "Book search already saved" });
          break;
        }
      }

      // Return response if available
      if (response) {
        return response;
      }

      const newBook = new BooksSearch({
        searchString: searchQuery,
        userId: userId,
      });
      await newBook.save();
      return res.status(201).json({ message: "Book search saved" });
    }

    else {
      const newBook = new BooksSearch({
        searchString: searchQuery,
        userId: userId,
      });
      await newBook.save();
      return res.status(201).json({ message: "Book search saved" });

    }
  } catch (err) {
    return res.status(400).json({ message: "Book query save failed" });
  }
});

module.exports = router;
