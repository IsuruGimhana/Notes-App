import { useState, useEffect } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateUserMutation } from '../slices/apiSlice';
import { userLogin as setCredentials } from '../slices/authSlice';

import '../styles/form.css'; // Make sure this includes global styles

const UserProfilePage = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <FormContainer>
      <div className='login-form'>
        <h1 className='text-center mb-4'>Update Profile</h1>

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

          <Button
            type='submit'
            className='hero-btn w-100'
            disabled={isLoading}
          >
            Update
          </Button>
        </Form>

        {isLoading && <Loader />}
      </div>
    </FormContainer>
  );
};

export default UserProfilePage;