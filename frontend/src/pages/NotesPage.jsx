import React, { useState } from 'react';
import {
  useGetNotesQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} from '../slices/apiSlice';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
  Modal,
} from 'react-bootstrap';
import '../styles/notes.css';

const NotesPage = () => {
  const { data: notes = [], isLoading, isError, refetch } = useGetNotesQuery();
  const [createNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingNote, setEditingNote] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCreateOrUpdate = async (e) => {
    e.preventDefault();

    try {
      if (editingNote) {
        await updateNote({ id: editingNote._id, title, content });
      } else {
        await createNote({ title, content });
      }

      setTitle('');
      setContent('');
      setEditingNote(null);
      setShowModal(false);
      refetch();
    } catch (err) {
      console.error('Error saving note:', err);
    }
  };

  const handleEdit = (note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingNote(note);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
      refetch();
    }
  };

  if (isLoading) {
    return <div className="text-center mt-5"><Spinner animation="border" /></div>;
  }

  if (isError) {
    return <div className="text-danger text-center mt-5">Error fetching notes.</div>;
  }

  return (
    <Container className="my-5">
      <Row>
        <Col>
          <h2 className="text-center mb-4">My Notes</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>+ Add Note</Button>
        </Col>
      </Row>

      <Row className="mt-4">
        {notes.map((note) => (
          <Col md={4} key={note._id} className="mb-4">
            <Card className="note-card">
              <Card.Body>
                <Card.Title>{note.title}</Card.Title>
                <Card.Text>{note.content}</Card.Text>
                <div className="d-flex justify-content-between">
                  <Button size="sm" variant="outline-primary" onClick={() => handleEdit(note)}>Edit</Button>
                  <Button size="sm" variant="outline-danger" onClick={() => handleDelete(note._id)}>Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Create/Update */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingNote ? 'Edit Note' : 'New Note'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCreateOrUpdate}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter note title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter note content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success">
              {editingNote ? 'Update Note' : 'Create Note'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default NotesPage;
