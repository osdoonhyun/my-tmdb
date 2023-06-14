import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function DatasFormContainer({ datas, title }) {
  const navigate = useNavigate();

  const showTitle = (data) => {
    if (title === '티비') {
      return getTitle(data.name);
    } else if (title === '무비') {
      return getTitle(data.title);
    }
  };

  const showOriginalTitle = (data) => {
    if (title === '티비') {
      return getTitle(data.original_name);
    } else if (title === '무비') {
      return getTitle(data.original_title);
    }
  };

  const getTitle = (data) => {
    return data.length < 30 ? data : data.slice(0, 30) + '...';
  };

  const showReleaseDate = (data) => {
    if (title === '티비') {
      return data.first_air_date;
    } else if ((title = '무비')) {
      return data.release_date;
    }
  };

  const onClickCard = (id) => {
    if (title === '티비') {
      navigate(`/tv/${id}`);
    } else if ((title = '무비')) {
      navigate(`/movie/${id}`);
    }
  };

  return (
    <Container>
      <h1 className='mt-4'>{title}</h1>
      <Row>
        {datas &&
          datas.map((data) => (
            <Col className='mt-4' key={data.id}>
              <Card
                className='custom-card'
                style={{ width: '18rem', height: '750px', cursor: 'pointer' }}
                onClick={() => onClickCard(data.id)}
              >
                <Card.Img
                  variant='top'
                  style={{ height: '400px' }}
                  src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                />
                <ListGroup className='list-group-flush'>
                  <ListGroup.Item>{showTitle(data)}</ListGroup.Item>
                  <ListGroup.Item>{showOriginalTitle(data)}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                  <Card.Title>
                    {data.overview.length < 20
                      ? data.overview.length === 0
                        ? 'No overview'
                        : data.overview
                      : data.overview.slice(0, 125) + '...'}
                  </Card.Title>
                </Card.Body>

                <Card.Footer>
                  <Card.Text style={{ fontSize: '15px' }}>
                    개봉 날짜: {showReleaseDate(data)}
                  </Card.Text>
                  <Card.Text style={{ fontSize: '15px' }}>
                    평점: {data.vote_average}
                  </Card.Text>
                </Card.Footer>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
}
