import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const API_KEY = '68d3b58f0873761971218e8327d8873a';

export default function Details() {
  const { detailId } = useParams();
  const [movieData, setMovieData] = useState({});

  const getMovieData = async (id) => {
    try {
      const address = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

      const { data, status } = await axios.get(address);
      console.log('Detail data', data);
    } catch (error) {
      console.log('Detail Error', error.message);
    }
  };

  useEffect(() => {
    getMovieData(detailId);
  }, []);

  return <>{detailId}</>;
}
