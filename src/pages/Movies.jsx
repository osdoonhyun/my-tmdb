import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default function Movies() {
  const [moviesData, setMoviesData] = useState([]);

  const getMoviesData = async () => {
    const address = 'https://api.themoviedb.org/3/movie/now_playing';
    const options = {
      // method: 'GET',  //fetch 일 때 사용
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGQzYjU4ZjA4NzM3NjE5NzEyMThlODMyN2Q4ODczYSIsInN1YiI6IjY0NzA0OGMwMzM2ZTAxMDE0YjYyNWI3OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3u9U1AFbLAEL6wblb4n0782dnv-doAEo2Ae5brSiz9g',
      },
    };
    try {
      const { data, status } = await axios.get(address, options);
      console.log('data', data);

      if (status === 200) {
        setMoviesData(data.results);
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  useEffect(() => {
    getMoviesData();
  }, []);
  // title, popularity, poster_path
  return (
    <Container>
      <br />
      <h1>영화 리스트</h1>
      <Row className='mt-3'>
        <Table striped bordered hover variant='dark'>
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Language</th>
              <th>Popularity</th>
              <th>Video</th>
              <th>Vote_average</th>
              <th>Genre</th>
            </tr>
          </thead>
          <tbody>
            {moviesData &&
              moviesData.map((movie, index) => (
                <LinkContainer to={`/${movie.id}`}>
                  <tr key={movie.id}>
                    <td>{index}</td>
                    <td>{movie.title}</td>
                    <td>{movie.original_language}</td>
                    <td>{movie.popularity}</td>
                    <td>{movie.video}</td>
                    <td>{movie.vote_average}</td>
                    <td>{movie?.genre_ids?.map((genre) => genre + ', ')}</td>
                  </tr>
                </LinkContainer>
              ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
}
