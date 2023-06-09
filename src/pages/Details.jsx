import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Image, Row, Stack } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import '../styles/Custom.css';

const API_KEY = '68d3b58f0873761971218e8327d8873a';

export default function Details() {
  const { pathname, detailId } = useParams();
  const [detailData, setDetailData] = useState({});

  const getDetailData = async (path, id) => {
    try {
      const address = `https://api.themoviedb.org/3/${path}/${id}?api_key=${API_KEY}`;

      const { data, status } = await axios.get(address);
      if (status === 200) {
        console.log('Detail data', data);
        setDetailData(data);
      }
    } catch (error) {
      console.log('Detail Error', error.message);
    }
  };

  useEffect(() => {
    getDetailData(pathname, detailId);
  }, []);

  const getTitle = (data) => {
    if (pathname === 'movie') {
      return data.title;
    } else if (pathname === 'tv') {
      return data.name;
    }
  };

  const getYear = (data) => {
    if (pathname === 'movie') {
      return data?.release_date?.slice(0, 4);
    } else if (pathname === 'tv') {
      return data?.first_air_date?.slice(0, 4);
    }
  };

  const getCountry = (data) => {
    return data.production_countries?.map((country) => country.name);
  };

  const getGenres = (data) => {
    return data.genres?.map((genre) => genre.name).join(' / ');
  };

  return (
    <div className='background-color'>
      <Image
        src={`https://image.tmdb.org/t/p/original${detailData.backdrop_path}`}
        alt='back_poster'
        fluid
        style={{
          maxHeight: '320px',
          width: '100%',
          objectFit: 'cover',
          borderBottom: '3px solid #e3e3e3',
        }}
      />
      <div
        style={{
          width: '100%',
          borderBottom: '2px solid #e3e3e3',
          backgroundColor: '#fff',
        }}
      >
        <Container
          style={{
            width: '66%',
            backgroundColor: '#fff',
          }}
          fluid
        >
          <Stack direction='horizontal' className='pb-3'>
            <Image
              src={`https://image.tmdb.org/t/p/original${detailData.poster_path}`}
              alt='poster'
              thumbnail
              style={{
                width: '185px',
                objectFit: 'cover',
                marginTop: '-15px',
              }}
            />
            <Stack style={{ marginLeft: '2rem' }} gap={3}>
              <h1>{getTitle(detailData)}</h1>
              <div style={{ marginLeft: '10px' }}>
                <h5 className='custom-font-color'>
                  {getYear(detailData) +
                    ' ・ ' +
                    getGenres(detailData) +
                    ' ・ ' +
                    getCountry(detailData)}
                </h5>
              </div>
            </Stack>
          </Stack>
        </Container>
      </div>

      <Container
        className='mt-5'
        style={{
          width: '66%',
          padding: '20px',
          borderRadius: '10px',
          backgroundColor: '#fff',
          border: '2px solid #e3e3e3',
        }}
      >
        <h3>기본 정보</h3>
        <Row className='mt-3'>
          <Col xs lg='1' className='custom-font-color'>
            제목
          </Col>
          <Col>{getTitle(detailData)}</Col>
        </Row>
        <Row className='my-2'>
          <Col xs lg='1' className='custom-font-color'>
            개요
          </Col>
          <Col>
            {getYear(detailData) +
              ' ・ ' +
              getGenres(detailData) +
              ' ・ ' +
              getCountry(detailData)}
          </Col>
        </Row>
        <Row className='my-2'>
          <Col xs lg='1' className='custom-font-color'>
            평점
          </Col>
          <Col>⭐️ {detailData.vote_average?.toFixed(1)}</Col>
        </Row>
        <Row className='my-2'>
          <Col xs lg='1' className='custom-font-color'>
            줄거리
          </Col>
          <Col>{detailData.overview}</Col>
        </Row>
      </Container>
    </div>
  );
}
