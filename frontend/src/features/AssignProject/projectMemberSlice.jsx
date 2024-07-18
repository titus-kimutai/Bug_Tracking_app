import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { API_URL } from '../../services/api';


export const fetchProjectMembers = createAsyncThunk('projectMembers/fetchProjectMembers', async (projectId, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${API_URL}/projects/${projectId}`);
    return response.data.data.projectMembers;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An error occurred' });
  }
})

export const assignUserToProject = createAsyncThunk('projectMembers/assignUserToProject', async ({ project_id, user_id, role }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${API_URL}/projectmembers`, { project_id, user_id, role });
    return response.data.data.newProjectMember;
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An error occurred' });
  }
});

export const removeUserFromProject = createAsyncThunk('projectMembers/removeUserFromProject', async ({ project_id, user_id }, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/projects/${project_id}`);
    return { project_id, user_id };
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'An error occurred' });
  }
});

const projectMemberSlice = createSlice({
  name: 'projectMembers',
  initialState: {
    projectMembers: [],
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjectMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectMembers = action.payload;
      })
      .addCase(fetchProjectMembers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      })
      .addCase(assignUserToProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(assignUserToProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectMembers.push(action.payload);
      })
      .addCase(assignUserToProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      })
      .addCase(removeUserFromProject.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeUserFromProject.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.projectMembers = state.projectMembers.filter(
          (member) => !(member.project_id === action.payload.project_id && member.user_id === action.payload.user_id)
        );
      })
      .addCase(removeUserFromProject.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload?.message || 'An error occurred';
      });
  },
});

export const { reset } = projectMemberSlice.actions;
export default projectMemberSlice.reducer;
