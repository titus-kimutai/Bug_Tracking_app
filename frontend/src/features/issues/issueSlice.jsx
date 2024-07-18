import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const fetchIssues = createAsyncThunk('issues/fetchIssues', async (projectId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/issues?projectId=${projectId}`);
    return response.data.data.issues;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An error occurred' });
  }
});

export const fetchCommentsByIssueId = createAsyncThunk(
  'issues/fetchCommentsByIssueId',
  async (issueId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/comments?issueId=${issueId}`);
      return response.data.data.comments;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'An error occurred' });
    }
  }
);


export const updateIssue = createAsyncThunk('issues/updateIssue', async (issue, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/issues/${issue.issue_id}`, issue);
    return response.data.data.issue;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An error occurred' });
  }
});

export const createIssue = createAsyncThunk('issues/createIssue', async (issue, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/issues`, issue);
    return response.data.data.issue;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An error occurred' });
  }
});

export const addComment = createAsyncThunk('issues/addComment', async (commentData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/comments`, commentData);
    return response.data.data.comment;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An error occurred' });
  }
});

const issueSlice = createSlice({
  name: 'issues',
  initialState: {
    issues: [],
    comments: [], 
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: '',
  },
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = '';
    },
    updateIssueStatus: (state, action) => {
      const { issueId, newStatus } = action.payload;
      const issue = state.issues.find((issue) => issue.issue_id === issueId);
      if (issue) {
        issue.status = newStatus;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = action.payload;
      })
      .addCase(fetchIssues.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      })
      .addCase(updateIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedIssue = action.payload;
        const index = state.issues.findIndex((issue) => issue.issue_id === updatedIssue.issue_id);
        if (index !== -1) {
          state.issues[index] = updatedIssue;
        }
      })
      .addCase(updateIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      })
      .addCase(createIssue.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createIssue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues.push(action.payload);
      })
      .addCase(createIssue.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      })
      .addCase(addComment.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const comment = action.payload;
        const issue = state.issues.find((issue) => issue.issue_id === comment.issue_id);
        if (issue) {
          if (!issue.comments) {
            issue.comments = [];
          }
          issue.comments.push(comment);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      })
      .addCase(fetchCommentsByIssueId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCommentsByIssueId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByIssueId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      });
  },
});

export const { reset, updateIssueStatus } = issueSlice.actions;
export default issueSlice.reducer;
