/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getBooks, booksVisibility } from '../api/bookData';
import { useAuth } from '../utils/context/authContext';
import BookCard from '../components/BookCard';

function Home() {
  // State for all books (public + private)
  const [books, setBooks] = useState([]);

  // Get user ID using useAuth Hook
  const { user } = useAuth();

  // Function to fetch both public and private books
  const fetchBooks = async () => {
    try {
      // Fetch all public books
      const publicBooks = await booksVisibility(true);

      // Fetch private books if user is logged in
      let privateBooks = [];
      if (user?.uid) {
        privateBooks = await getBooks(user.uid);

        // Filter out any public books from the privateBooks array
        privateBooks = privateBooks.filter((book) => !publicBooks.some((publicBook) => publicBook.firebaseKey === book.firebaseKey));
      }

      // Combine public and filtered private books
      const combinedBooks = [...publicBooks, ...privateBooks];
      setBooks(combinedBooks);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Fetch all books on component render
  useEffect(() => {
    if (user) {
      fetchBooks();
    }
  }, [user]);

  return (
    <div className="text-center my-4">
      <Link href="/book/new" passHref>
        <Button variant="dark" className="mb-3 btn">
          Add Book
        </Button>
      </Link>
      <div className="d-flex flex-wrap justify-content-center">{books.length > 0 ? books.map((book) => <BookCard key={book.firebaseKey} bookObj={book} onUpdate={fetchBooks} />) : <p className="text-white">No books available.</p>}</div>
    </div>
  );
}

export default Home;
