/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { viewAuthorDetails } from '../../../api/mergedData';

export default function ViewAuthor({ params }) {
  const [authorDetails, setAuthorDetails] = useState({});

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewAuthorDetails(firebaseKey).then(setAuthorDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap justify-content-center">
      <div className="text-white ms-5 details">
        <h5 className="mb-3">
          {authorDetails.first_name} {authorDetails.last_name}
          {authorDetails.favorite ? ' 🤍' : ''}
        </h5>
        <h6 className="mb-3 email">
          Author Email:{' '}
          <a href={`mailto:${authorDetails.email}`} style={{ color: 'indianred' }}>
            {authorDetails.email}
          </a>
        </h6>
        <h6 className="mb-3">Books:</h6>
        {authorDetails.books && authorDetails.books.length > 0 ? (
          <ul>
            {authorDetails.books.map((book) => (
              <li key={book.firebaseKey} className="d-flex align-items-center mb-3">
                <img src={book.image} alt={book.title} style={{ width: '50px', height: '75px', objectFit: 'cover', marginRight: '10px' }} />
                <span>{book.title}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No books available for this author.</p>
        )}
        <hr />
      </div>
    </div>
  );
}

ViewAuthor.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
