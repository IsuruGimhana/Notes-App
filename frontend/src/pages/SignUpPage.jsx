import { useState, useEffect } from 'react';
import { Form, Button, Row, Col, FloatingLabel } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/apiSlice';
import { userLogin as setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

import '../styles/form.css';

const SignUpPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate('/');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <div className='login-form'>
        <h1 className='text-center mb-4'>Register</h1>

        <Form onSubmit={submitHandler}>
          <FloatingLabel controlId='name' label='Name' className='mb-3'>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FloatingLabel>

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

          <FloatingLabel controlId='confirmPassword' label='Confirm Password' className='mb-3'>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FloatingLabel>

          <Button type='submit' variant='primary' className='w-100 mt-2'>
            Register
          </Button>

          {isLoading && <Loader />}
        </Form>

        <Row className='py-3'>
          <Col className='text-center'>
            Already have an account? <Link to='/login'>Login</Link>
          </Col>
        </Row>
      </div>
    </FormContainer>
  );
};

export default SignUpPage;