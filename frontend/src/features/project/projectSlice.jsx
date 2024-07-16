import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API_URL } from '../../services/api';
import axios from 'axios';

// Fetch Projects
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/projects`);
    return response.data.data.projects;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An error occurred' });
  }
});

// Update Project
export const updateProject = createAsyncThunk('projects/updateProject', async (project, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${API_URL}/projects/${project.project_id}`, project);
    return response.data.data.project;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An error occurred' });
  }
});

// Create Project
export const createProject = createAsyncThunk('projects/createProject', async (project, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/projects`, project);
    return response.data.data.project;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An error occurred' });
  }
});

export const fetchIssuesByProjectId = createAsyncThunk('projects/fetchIssuesByProjectId', async (projectId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}/issues`);
    return response.data.data.issues;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An error occurred' });
  }
});

const projectSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    issues: [],
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
      state.issues = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      })
      .addCase(updateProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedProject = action.payload;
        const index = state.projects.findIndex((proj) => proj.project_id === updatedProject.project_id);
        if (index !== -1) {
          state.projects[index] = updatedProject;
        }
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      })
      .addCase(createProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      })
      .addCase(fetchIssuesByProjectId.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIssuesByProjectId.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.issues = action.payload;
      })
      .addCase(fetchIssuesByProjectId.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      });
  },
});

export const { reset } = projectSlice.actions;
export default projectSlice.reducer;
