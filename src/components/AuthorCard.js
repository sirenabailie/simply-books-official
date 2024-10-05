import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteAuthorBooks } from '../api/mergedData';

function AuthorCard({ authorObj, onUpdate }) {
  const deleteThisAuthor = () => {
    if (window.confirm(`Delete ${authorObj.first_name}? This will also delete all their books.`)) {
      deleteAuthorBooks(authorObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem', margin: '10px' }} className="text-center card">
      {' '}
      {/* Center all text inside the card */}
      <Card.Body>
        <Card.Title>
          {authorObj.first_name} {authorObj.last_name}
          {authorObj.favorite && (
            <span>
              ❤️
              <br />
            </span>
          )}
        </Card.Title>
        <p className="card-text bold">@{authorObj.email}</p>
        {/* Center the buttons */}
        <div className="d-flex justify-content-center">
          {/* DYNAMIC LINK TO VIEW THE AUTHOR DETAILS */}
          <Link href={`/authors/${authorObj.firebaseKey}`} passHref>
            <Button variant="dark" className="m-2">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </Button>
          </Link>
          {/* DYNAMIC LINK TO EDIT THE AUTHOR DETAILS */}
          <Link href={`/authors/edit/${authorObj.firebaseKey}`} passHref>
            <Button variant="dark" className="m-2">
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </Link>
          <Button variant="danger" onClick={deleteThisAuthor} className="m-2">
            <FontAwesomeIcon icon={faTrashCan} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

AuthorCard.propTypes = {
  authorObj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    favorite: PropTypes.bool,
    email: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default AuthorCard;
