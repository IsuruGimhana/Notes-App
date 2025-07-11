import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../styles/hero.css';

const HomePage = () => {

  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/notes');
    }
  }, [navigate, userInfo]);

  return (
    <div className='hero-section'>
      <Container>
        {/* Centered Top Card */}
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <Card className='p-5 d-flex flex-column align-items-center hero-card text-center fade-in'>
              <p className="hero-description">
                Welcome to the Notes MERN App — a powerful and secure full-stack note-taking application. Built with MongoDB, Express, React, and Node.js, this app features user authentication, note CRUD functionality, JWT sessions stored in HTTP-only cookies, and seamless state management with Redux Toolkit.
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
              <h5>Notes Management</h5>
              <p>Create, edit, and delete personal notes with ease.</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='p-4 feature-card'>
              <h5>Secure Auth</h5>
              <p>JWT stored in HTTP-only cookies for maximum security.</p>
            </Card>
          </Col>
          <Col md={4}>
            <Card className='p-4 feature-card'>
              <h5>Redux Toolkit</h5>
              <p>Centralized and scalable state management.</p>
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
