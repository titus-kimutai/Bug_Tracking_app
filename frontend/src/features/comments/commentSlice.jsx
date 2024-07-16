import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchCommentsByIssueId = createAsyncThunk(
  'comments/fetchCommentsByIssueId',
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/comments?issueId=${issueId}`);
      return response.data.data.comments;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'An error occurred' });
    }
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (commentData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/comments`, commentData);
      return response.data.data.comment;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'An error occurred' });
    }
  }
);

const initialState = {
  comments: [],
  isLoading: false,
  isError: false,
  message: ''
};

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsByIssueId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCommentsByIssueId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments = action.payload;  
      })
      .addCase(fetchCommentsByIssueId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.comments.push(action.payload);  
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      });
  }
});

export default commentSlice.reducer;
