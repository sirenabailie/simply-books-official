'use client';

import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-duplicates
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
// eslint-disable-next-line import/no-extraneous-dependencies
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-duplicates
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteBook } from '../api/bookData';

function BookCard({ bookObj, onUpdate }) {
  // FOR DELETE, WE NEED TO REMOVE THE BOOK AND HAVE THE VIEW RERENDER,
  // SO WE PASS THE FUNCTION FROM THE PARENT THAT GETS THE BOOKS
  const deleteThisBook = () => {
    if (window.confirm(`Delete ${bookObj.title}?`)) {
      deleteBook(bookObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card className="card" style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={bookObj.image} alt={bookObj.title} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>
          {bookObj.title}{' '}
          {bookObj.sale && (
            <span>
              🏷️
              <br />
            </span>
          )}{' '}
        </Card.Title>
        <h6>${bookObj.price}</h6>
        {/* DYNAMIC LINK TO VIEW THE BOOK DETAILS  */}
        <Link href={`/book/${bookObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BOOK DETAILS  */}
        <Link href={`/book/edit/${bookObj.firebaseKey}`} passHref>
          <Button variant="success">
            <FontAwesomeIcon icon={faPenToSquare} />
          </Button>
        </Link>
        <Button variant="danger" onClick={deleteThisBook} className="m-2">
          <FontAwesomeIcon icon={faTrashCan} />
        </Button>
      </Card.Body>
    </Card>
  );
}

BookCard.propTypes = {
  bookObj: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    sale: PropTypes.bool,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BookCard;
