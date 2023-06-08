import { useEffect, useState } from 'react';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import DatasFormContainer from '../components/DatasFormContainer';

export default function Tvs() {
  const [tvs, setTvs] = useState([]);

  const getTvsData = async () => {
    const address = 'https://api.themoviedb.org/3/tv/popular';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGQzYjU4ZjA4NzM3NjE5NzEyMThlODMyN2Q4ODczYSIsInN1YiI6IjY0NzA0OGMwMzM2ZTAxMDE0YjYyNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3u9U1AFbLAEL6wblb4n0782dnv-doAEo2Ae5brSiz9g',
      },
    };

    try {
      await fetch(address, options)
        .then((res) => res.json())
        .then((response) => {
          setTvs(response.results);
          console.log('++++++++', response.results);
        });
    } catch (error) {
      console.log('tvsError', error.message);
    }
  };
  console.log('tvsdf', tvs);
  useEffect(() => {
    getTvsData();
  }, []);

  return <DatasFormContainer title='티비' datas={tvs} />;
}
