'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { updateAuthor, createAuthor } from '../../api/authorData';

const initialState = {
  first_name: '',
  last_name: '',
  price: '',
  email: '',
  favorite: false,
};

function AuthorForm({ obj = initialState }) {
  const [formInput, setFormInput] = useState(obj);
  const router = useRouter();
  const { user } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateAuthor(formInput).then(() => router.push(`/authors/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createAuthor(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateAuthor(patchPayload).then(() => {
          router.push('/authors');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="text-black">
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} Author</h2>

      {/* FIRST_NAME INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="First Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter First Name" name="first_name" value={formInput.first_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* LAST_NAME INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Last Name" className="mb-3">
        <Form.Control type="text" placeholder="Enter Last Name" name="last_name" value={formInput.last_name} onChange={handleChange} required />
      </FloatingLabel>

      {/* EMAIL INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Email" className="mb-3">
        <Form.Control type="text" placeholder="Enter Email" name="email" value={formInput.email} onChange={handleChange} required />
      </FloatingLabel>

      {/* TOGGLE FAVS  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="favorite"
        name="favorite"
        label="💖 Favorite?"
        checked={formInput.favorite}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            favorite: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Author</Button>
    </Form>
  );
}

AuthorForm.propTypes = {
  obj: PropTypes.shape({
    first_name: PropTypes.string,
    last_name: PropTypes.string,
    email: PropTypes.string,
    price: PropTypes.string,
    favorite: PropTypes.bool,
    firebaseKey: PropTypes.string,
  }),
};

export default AuthorForm;
