'use client';

import React, { useEffect, useState } from 'react';
import { favoriteAuthors } from '../../../api/authorData';
import AuthorCard from '../../../components/AuthorCard';
import { useAuth } from '../../../utils/context/authContext';

export default function FavoriteAuthors() {
  const [favAuthors, SetFavAuthors] = useState([]);
  const { user } = useAuth();

  const getFavoriteAuthors = () => {
    favoriteAuthors(user.uid).then(SetFavAuthors);
  };

  useEffect(() => {
    getFavoriteAuthors();
  }, []);

  return (
    <>
      <div className="text-center justify-content-center fav">
        <h4 style={{ margin: '20px 0' }}>Favorites 💖</h4>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {favAuthors.map((favoriteAuthorObj) => (
          <AuthorCard key={favoriteAuthorObj.firebaseKey} authorObj={favoriteAuthorObj} />
        ))}
      </div>
    </>
  );
}
