import axios from 'axios';
import { useEffect, useState } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import ContentsFormContainer from '../components/ContentsFormContainer';

export default function TvList() {
  const [tvsData, setTvsData] = useState([]);

  const getTvsData = async () => {
    const address = 'https://api.themoviedb.org/3/tv/top_rated';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: process.env.REACT_APP_BEARER_TOKEN,
      },
    };
    try {
      const { data, status } = await axios.get(address, options);
      console.log('tvdata', data);

      if (status === 200) {
        setTvsData(data.results.slice(0, 10));
      }
    } catch (error) {
      console.log('error', error.message);
    }
  };

  useEffect(() => {
    getTvsData();
  }, []);
  // title, popularity, poster_path
  return (
    <ContentsFormContainer title='티비'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Language</th>
          <th>Popularity</th>
          <th>First-Air-Date</th>
          <th>Vote_average</th>
          <th>Genre</th>
        </tr>
      </thead>
      <tbody>
        {tvsData &&
          tvsData.map((tv, index) => (
            <LinkContainer to={`/tv/${tv.id}`}>
              <tr key={tv.id}>
                <td>{index + 1}</td>
                <td>{tv.name}</td>
                <td>{tv.original_language}</td>
                <td>{tv.popularity}</td>
                <td>{tv.first_air_date}</td>
                <td>{tv.vote_average}</td>
                <td>{tv?.genre_ids?.map((genre) => genre + ', ')}</td>
              </tr>
            </LinkContainer>
          ))}
      </tbody>
    </ContentsFormContainer>
  );
}
