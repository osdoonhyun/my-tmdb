import axios from 'axios';
import { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import ContentsFormContainer from '../components/ContentsFormContainer';

export default function MovieList() {
  const [moviesData, setMoviesData] = useState([]);

  const getMoviesData = async () => {
    const address = 'https://api.themoviedb.org/3/movie/top_rated';
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
      console.log('moviedata', data);

      if (status === 200) {
        setMoviesData(data.results.slice(0, 10));
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
    <ContentsFormContainer title='무비'>
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
                <td>{index + 1}</td>
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
    </ContentsFormContainer>
  );
}
