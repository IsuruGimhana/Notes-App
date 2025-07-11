import asyncHandler from 'express-async-handler';
import Note from '../models/noteModel.js';

// @desc    Get all notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
});

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const note = new Note({
    title,
    content,
    user: req.user._id,
  });

  const createdNote = await note.save();
  res.status(201).json(createdNote);
})

// @desc    Get a note by ID
// @route   GET /api/notes/:id
// @access  Private
const getNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note || note.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Note not found');
  }

  res.json(note);
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const note = await Note.findById(req.params.id);

  if (!note || note.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Note not found');
  }

  note.title = title || note.title;
  note.content = content || note.content;

  const updatedNote = await note.save();
  res.json(updatedNote);
})

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  console.log(note);

  if (!note || note.user.toString() !== req.user._id.toString()) {
    res.status(404);
    throw new Error('Note not found');
  }

  await note.deleteOne();
  res.json({ message: 'Note removed' });
});

export { getNotes, createNote, getNote, updateNote, deleteNote };
