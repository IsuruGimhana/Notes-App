import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/hero.css';

const HomePage = () => {
  return (
    <div className='hero-section'>
      <Container>
        {/* Centered Top Card */}
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Card className='p-5 d-flex flex-column align-items-center hero-card text-center fade-in'>
              <p className="hero-description">
                Kickstart your web application with a secure and modern authentication system built on the MERN stack. This template provides everything you need — user login, registration, JWT-based sessions with HTTP-only cookies, and seamless state management using Redux Toolkit — all styled with React Bootstrap for a clean and responsive UI.
              </p>
              <div className='d-flex flex-wrap justify-content-center gap-3 mt-4'>
                <Button variant='primary' href='/login' className='hero-btn'>
                  Sign In
                </Button>
                <Button variant='outline-light' href='/signup' className='hero-btn-outline'>
                  Register
                </Button>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Feature Cards Row */}
        <Row>
          <Col md={4}>
            <Card className='p-4 feature-card'>
              <h5>Secure Auth</h5>
              <p>JWT stored in HTTP-only cookies with full protection.</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='p-4 feature-card'>
              <h5>Redux Toolkit</h5>
              <p>Centralized state management for scalability.</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='p-4 feature-card'>
              <h5>Fast Setup</h5>
              <p>Plug-and-play boilerplate to kickstart your project.</p>
            </Card>
          </Col>
        </Row>

        {/* Tech Logos Card */}
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Card className='tech-card'>
              <h5 className='mb-4'>Technologies Used</h5>
              <div className='d-flex flex-wrap justify-content-center gap-4'>
                <a href='https://expressjs.com/' target='_blank' rel='noopener noreferrer'>
                  <img src='https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png' alt='Express' height={50} />
                </a>
                <a href='https://reactjs.org/' target='_blank' rel='noopener noreferrer'>
                  <img src='https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg' alt='React' height={50} />
                </a>
                <a href='https://nodejs.org/' target='_blank' rel='noopener noreferrer'>
                  <img src='https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg' alt='Node.js' height={50} />
                </a>
                <a href='https://www.mongodb.com/' target='_blank' rel='noopener noreferrer'>
                  <img src='https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg' alt='MongoDB' height={50} />
                </a>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomePage;
