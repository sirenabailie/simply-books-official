/* eslint-disable @next/next/no-img-element */

'use client';

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { viewBookDetails } from '@/api/mergedData';
import PropTypes from 'prop-types';

export default function ViewBook({ params }) {
  const [bookDetails, setBookDetails] = useState({});

  // grab firebaseKey from url
  const { firebaseKey } = params;

  // make call to API layer to get the data
  useEffect(() => {
    viewBookDetails(firebaseKey).then(setBookDetails);
  }, [firebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={bookDetails.image} alt={bookDetails.title} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {bookDetails.title} by {bookDetails.authorObject?.first_name} {bookDetails.authorObject?.last_name} {bookDetails.authorObject?.favorite && <FontAwesomeIcon icon={regularHeart} style={{ color: '#a50a0a', fontSize: '20px' }} />}
        </h5>
        Author Email:{' '}
        <a href={`mailto:${bookDetails.authorObject?.email}`} style={{ color: 'indianred' }}>
          {bookDetails.authorObject?.email}
        </a>
        <p>{bookDetails.description || ''}</p>
        <hr />
        <p>
          {bookDetails.sale ? (
            <>
              <FontAwesomeIcon icon={faTag} style={{ color: '#ffffff', fontSize: '18px', marginRight: '5px' }} />
              Sale ${bookDetails.price}
            </>
          ) : (
            `$${bookDetails.price}`
          )}
        </p>
      </div>
    </div>
  );
}

ViewBook.propTypes = {
  params: PropTypes.objectOf({}).isRequired,
};
