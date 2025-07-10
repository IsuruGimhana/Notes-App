import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/apiSlice';
import { userLogin as setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

import '../styles/form.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <div className='login-form'>
        <h1 className='text-center mb-4'>Sign In</h1>

        <Form onSubmit={submitHandler}>
          <FloatingLabel controlId='email' label='Email address' className='mb-3'>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FloatingLabel>

          <FloatingLabel controlId='password' label='Password' className='mb-3'>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FloatingLabel>

          <Button
            disabled={isLoading}
            type='submit'
            variant='primary'
            className='w-100 mt-2'
          >
            Sign In
          </Button>
        </Form>

        {isLoading && <Loader />}

        <Row className='py-3'>
          <Col className='text-center'>
            New Customer? <Link to='/signup'>Register</Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
};

export default LoginPage;
