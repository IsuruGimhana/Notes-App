import express from 'express';
import { getNotes, createNote, getNote, updateNote, deleteNote } from '../controllers/noteController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getNotes);
router.post('/', protect, createNote);
router
  .route('/:id')
  .get(protect, getNote)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

export default router;