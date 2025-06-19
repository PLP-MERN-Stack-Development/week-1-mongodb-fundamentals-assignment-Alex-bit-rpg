// queries.js - MongoDB Queries for plp_bookstore database

// --- IMPORTANT: Ensure you are connected to the correct database in mongosh ---
// If you are not already in the 'plp_bookstore' database, run:
// use plp_bookstore
// -----------------------------------------------------------------------------

// --- Task 2: Basic CRUD Operations ---

// 1. Find all books in a specific genre (e.g., "Fantasy")
// Expected: The Hobbit, The Lord of the Rings
db.books.find({ genre: "Fantasy" });

// 2. Find books published after a certain year (e.g., 1950)
// Expected: To Kill a Mockingbird, The Catcher in the Rye, The Lord of the Rings, The Alchemist
db.books.find({ published_year: { $gt: 1950 } });

// 3. Find books by a specific author (e.g., "George Orwell")
// Expected: 1984, Animal Farm
db.books.find({ author: "George Orwell" });

// 4. Update the price of a specific book (e.g., "The Great Gatsby")
// Before update: Price is 9.99
db.books.updateOne(
    { title: "The Great Gatsby" },
    { $set: { price: 10.50 } }
);
// Verify the update (run this after the updateOne command)
// Expected: The Great Gatsby with price 10.50
db.books.find({ title: "The Great Gatsby" });

// 5. Delete a book by its title (e.g., "Moby Dick")
// Moby Dick is currently in_stock: false, making it a good candidate for deletion.
db.books.deleteOne({ title: "Moby Dick" });
// Verify the deletion (run this after the deleteOne command)
// Expected: No document found for Moby Dick
db.books.find({ title: "Moby Dick" });
// Check total count - it should be 11 now if Moby Dick was deleted
// db.books.countDocuments();


// --- Task 3: Advanced Queries ---

// 1. Find books that are both in stock and published after 1980
// Expected: The Alchemist
db.books.find({
    in_stock: true,
    published_year: { $gt: 1980 }
});

// 2. Use projection to return only the title, author, and price fields
// Exclude the default _id field for cleaner output
db.books.find(
    {}, // Query for all documents
    { title: 1, author: 1, price: 1, _id: 0 } // Projection: include these fields, exclude _id
);

// 3. Implement sorting to display books by price (ascending)
db.books.find().sort({ price: 1 });

// 4. Implement sorting to display books by price (descending)
db.books.find().sort({ price: -1 });

// 5. Use the limit and skip methods to implement pagination (5 books per page)

// Page 1 (first 5 books, sorted by title for consistent pagination)
db.books.find().sort({ title: 1 }).limit(5).skip(0);

// Page 2 (next 5 books, sorted by title)
db.books.find().sort({ title: 1 }).limit(5).skip(5);

// Page 3 (remaining book(s), sorted by title)
db.books.find().sort({ title: 1 }).limit(5).skip(10);


// --- Task 4: Aggregation Pipeline ---

// 1. Create an aggregation pipeline to calculate the average price of books by genre
db.books.aggregate([
    {
        $group: {
            _id: "$genre",         // Group by the 'genre' field
            averagePrice: { $avg: "$price" } // Calculate the average of 'price'
        }
    },
    {
        $sort: { averagePrice: -1 } // Optional: Sort by average price descending
    }
]);

// 2. Create an aggregation pipeline to find the author with the most books in the collection
db.books.aggregate([
    {
        $group: {
            _id: "$author",      // Group by the 'author' field
            bookCount: { $sum: 1 } // Count the number of books for each author
        }
    },
    {
        $sort: { bookCount: -1 } // Sort by book count in descending order
    },
    {
        $limit: 1                // Get only the top author
    }
]);

// 3. Implement a pipeline that groups books by publication decade and counts them
db.books.aggregate([
    {
        $project: {
            // Calculate the decade: e.g., 1960 for 1960-1969
            decade: { $multiply: [{ $floor: { $divide: ["$published_year", 10] } }, 10] }
        }
    },
    {
        $group: {
            _id: "$decade",      // Group by the calculated 'decade'
            bookCount: { $sum: 1 } // Count the number of books in each decade
        }
    },
    {
        $sort: { _id: 1 }        // Sort by decade in ascending order
    }
]);


// --- Task 5: Indexing ---

// 1. Create an index on the 'title' field for faster searches
db.books.createIndex({ title: 1 }); // 1 for ascending order

// 2. Create a compound index on 'author' and 'published_year'
db.books.createIndex({ author: 1, published_year: -1 }); // author ascending, published_year descending

// Verify the indexes created
db.books.getIndexes();

// 3. Use the explain() method to demonstrate the performance improvement with your indexes

// Explain a query using the 'title' index
// This query should use the 'title_1' index. Look for "IXSCAN" in the winningPlan.stage.
db.books.find({ title: "The Hobbit" }).explain("executionStats");

// Explain a query using the compound index on 'author' and 'published_year'
// This query should use the 'author_1_published_year_-1' index. Look for "IXSCAN".
db.books.find({ author: "J.R.R. Tolkien", published_year: 1954 }).explain("executionStats");

// Example of a query that might *not* use an index (for comparison, if you want to see a COLLSCAN)
// This query searches only by published_year (which is part of a compound index,
// but not the leading field, so it might not be used efficiently without other conditions)
// or on an unindexed field if you hadn't created the compound index.
// db.books.find({ published_year: 1949 }).explain("executionStats");s
