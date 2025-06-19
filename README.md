# PLP Bookstore MongoDB Fundamentals Assignment

This repository contains the files demonstrating fundamental MongoDB operations, including data setup, CRUD operations, advanced queries, aggregation pipelines, and indexing for performance optimization.

## Files Included:

* `insert_books.js`: A Node.js script used to populate the `plp_bookstore` database with sample book data.
* `queries.js`: A JavaScript file containing all the MongoDB shell (`mongosh`) queries for completing the assignment tasks.
* `README.md`: This file, providing instructions and explanations.
* `screenshot.png`: A screenshot of the `plp_bookstore` database and `books` collection from MongoDB Compass or MongoDB Atlas, demonstrating the populated data.

## Setup Instructions

To run and test the MongoDB operations, follow these steps:

1.  **Install MongoDB:**
    * **Local Machine (Recommended):**
        * Download and install MongoDB Community Edition (including `mongod` and `mongosh`) from the official MongoDB website: [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community).
        * Ensure MongoDB Compass is also installed, as it's useful for viewing data.
        * Start the MongoDB server (`mongod`) if it doesn't run automatically as a service.
    * **MongoDB Atlas (Cloud):**
        * Sign up for a free account at [https://cloud.mongodb.com/](https://cloud.mongodb.com/) and create a **Shared Cluster (M0 Tier)**.
        * During cluster setup, remember to:
            * Create a **database user** with a strong password.
            * Configure **network access** to allow connections from your IP address (or "Access from Anywhere" for simplicity during testing, though not recommended for production).
        * Obtain your `mongosh` connection string from the "Connect" section of your Atlas cluster.

2.  **Connect to MongoDB:**
    * **Local MongoDB:** Open your terminal or command prompt and type `mongosh`. You should see the `test>` prompt.
    * **MongoDB Atlas:** Copy your `mongosh` connection string from the Atlas UI (it starts with `mongosh "mongodb+srv://..."`) and paste it into your terminal, then press Enter.

3.  **Create Database and Collection:**
    * Once connected in `mongosh`, switch to (and implicitly create) the `plp_bookstore` database and explicitly create the `books` collection:
        ```javascript
        use plp_bookstore
        db.createCollection("books")
        ```
    * Verify by typing `show collections`.

4.  **Populate Data using `insert_books.js`:**
    * The `insert_books.js` file is a Node.js script. You need Node.js installed to run it.
    * **Install MongoDB Node.js driver (if not already installed):**
        ```bash
        npm install mongodb
        ```
    * **Run the script:** Open your terminal or command prompt, navigate to the directory where `insert_books.js` is saved, and execute:
        ```bash
        node insert_books.js
        ```
        *If you are using MongoDB Atlas, make sure the `uri` variable in `insert_books.js` is updated with your Atlas connection string (e.g., `const uri = 'mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@yourcluster.mongodb.net/?retryWrites=true&w=majority';`).*
    * You should see confirmation messages about the books being inserted.

## Running MongoDB Queries

All the required MongoDB queries for basic CRUD, advanced queries, aggregation, and indexing demonstrations are located in the `queries.js` file.

1.  **Open your `mongosh` client** (connected to your `plp_bookstore` database).
2.  **Execute the queries:** You can either:
    * **Copy and paste** individual queries or sections from `queries.js` directly into the `mongosh` prompt and press Enter after each.
    * **Load the entire file** into `mongosh` by navigating your terminal to the directory containing `queries.js` and running:
        ```javascript
        load("queries.js")
        ```
        *Note: When loading the entire file, the output for `explain()` methods can be extensive. It's often better to run `explain()` queries individually to inspect their output clearly.*

## Assignment Tasks Covered:

* **Task 1: MongoDB Setup:** `plp_bookstore` database and `books` collection created.
* **Task 2: Basic CRUD Operations:** Demonstrations of `find`, `updateOne`, `deleteOne` in `queries.js`. Data populated via `insert_books.js`.
* **Task 3: Advanced Queries:** Queries demonstrating filtering (`$gt`), projection (`title: 1, _id: 0`), sorting (`price: 1`), and pagination (`limit`, `skip`) in `queries.js`.
* **Task 4: Aggregation Pipeline:** Pipelines for calculating average price by genre, finding the author with most books, and grouping by publication decade in `queries.js`.
* **Task 5: Indexing:** Creation of single (`title: 1`) and compound (`author: 1, published_year: -1`) indexes, and usage of `explain("executionStats")` to show performance improvements, all in `queries.js`.

## Screenshot

`screenshot.png` shows the `plp_bookstore` database with the `books` collection and some sample documents, confirming successful data insertion and database setup.

## How to Submit

1.  Accept the GitHub Classroom assignment invitation.
2.  Clone your personal repository.
3.  Place `insert_books.js`, `queries.js`, `README.md`, and `screenshot.png` into the cloned repository.
4.  Commit and push your changes to GitHub.