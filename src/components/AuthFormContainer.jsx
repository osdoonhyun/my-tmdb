import { Col, Container, Row } from 'react-bootstrap';

export default function AuthFormContainer({ title, children }) {
  return (
    <Container style={{ maxWidth: '400px' }}>
      <h1 className='mt-5'>{title}</h1>
      <Row className='mt-4'>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
}
