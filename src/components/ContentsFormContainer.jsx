import { Container, Row, Stack, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ContentsFormContainer({ title, children }) {
  const navigate = useNavigate();

  const onClickTitle = () => {
    if (title === '무비') {
      navigate('/movies');
    } else if (title === '티비') {
      navigate('/tvs');
    }
  };

  return (
    <>
      <Container>
        <br />
        <Stack direction='horizontal' gap={2}>
          <h1>{title} Top10</h1>
          <h4
            style={{ cursor: 'pointer' }}
            onClick={onClickTitle}
            className='ms-auto'
          >
            더보기 →
          </h4>
        </Stack>
        <Row className='mt-3'>
          <Table striped bordered hover variant='dark'>
            {children}
          </Table>
        </Row>
      </Container>
    </>
  );
}
