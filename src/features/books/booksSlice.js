import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const API_URL = 'http://localhost:3000/books';
 const API_URL = 'https://54.253.57.198/books';


export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const addBook = createAsyncThunk('books/addBook', async (book) => {
  const response = await axios.post(API_URL, book);
  return response.data;
});

export const updateBook = createAsyncThunk(
    'books/updateBook',
    async ({ id, book }, { rejectWithValue }) => {
      try {
        const response = await axios.patch(`${API_URL}/${id}`, book, {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        return response.data;
      } catch (err) {
        return rejectWithValue(err.response?.data || 'Failed to update book');
      }
    }
  );

export const deleteBook = createAsyncThunk('books/deleteBook', async (id) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.items.findIndex((book) => book._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.items = state.items.filter((book) => book._id !== action.payload);
      });
  },
});

export default booksSlice.reducer;