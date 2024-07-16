import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, reset, updateProject, createProject } from '../../features/project/projectSlice';
import { fetchUser } from '../../features/auth/authSlice';
import { assignUserToProject, fetchProjectMembers, removeUserFromProject } from '../../features/AssignProject/projectMemberSlice';
import CustomButton from '../../common/buttons/customButton';
import '../../styles/projectPage.css';

const ProjectsPage = () => {
  const dispatch = useDispatch();
  const { projects, isLoading, isError, isSuccess, message } = useSelector((state) => state.projects);
  const { users } = useSelector((state) => state.auth); 
  const { projectMembers } = useSelector((state) => state.projectMembers); 

  const [selectedProject, setSelectedProject] = useState(null);
  const [formValues, setFormValues] = useState({ project_id: '', name: '', description: '', assignee: '' });
  const [isCreating, setIsCreating] = useState(false);
  const [role, setRole] = useState(''); 

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUser()); 

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleViewClick = (project) => {
    setSelectedProject(project);
    setFormValues(project);
    setIsCreating(false);
    dispatch(fetchProjectMembers(project.project_id));
  };

  const handleCancelClick = () => {
    setSelectedProject(null);
    setFormValues({ project_id: '', name: '', description: '', assignee: '' });
    setIsCreating(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleUpdateClick = () => {
    dispatch(updateProject(formValues)).then((result) => {
      console.log('Update result:', result);
      setSelectedProject(null);
      setFormValues({ project_id: '', name: '', description: '', assignee: '' });
    });
  };

  const handleCreateClick = () => {
    setIsCreating(true);
    setFormValues({ name: '', description: '', assignee: '' });
  };

  const handleSaveClick = () => {
    dispatch(createProject(formValues)).then((result) => {
      console.log('Create result:', result);
      setIsCreating(false);
      setFormValues({ name: '', description: '', assignee: '' });
    });
  };

  const handleAssignClick = () => {
    console.log('Assigning user with values:', { project_id: selectedProject.project_id, user_id: formValues.assignee, role });
    dispatch(assignUserToProject({ project_id: selectedProject.project_id, user_id: formValues.assignee, role })).then((result) => {
      console.log('Assign result:', result);
      dispatch(fetchProjectMembers(selectedProject.project_id));
    });
  };

  const handleRemoveClick = (user_id) => {
    console.log('Removing user with values:', { project_id: selectedProject.project_id, user_id });
    dispatch(removeUserFromProject({ project_id: selectedProject.project_id, user_id })).then((result) => {
      console.log('Remove result:', result);
      dispatch(fetchProjectMembers(selectedProject.project_id)); 
    });
  };

  return (
    <div>
      <div className="item">
        <h2 className="title">Projects</h2>
        <CustomButton onClick={handleCreateClick}>Create Project</CustomButton>
      </div>
      <div className="main">
      <div className="container2">
        {isLoading && <p>Loading...</p>}
        {isError && <p className="error">{message}</p>}
        {isSuccess && Array.isArray(projects) && (
          <table className="table">
            <thead>
              <tr>
                <th className="table-header">Id</th>
                <th className="table-header">Project Name</th>
                <th className="table-header">Project Description</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.project_id} className="table-row">
                  <td className="table-cell">{project.project_id}</td>
                  <td className="table-cell">{project.name}</td>
                  <td className="table-cell">{project.description}</td>
                  <td className="table-cell">
                    <CustomButton onClick={() => handleViewClick(project)}>View</CustomButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {selectedProject && (
        <div className="project-details">
          <h3>Project Details</h3>
          <p><strong>Project Name:</strong> {formValues.name}</p>
          <p><strong>Project Description:</strong> {formValues.description}</p>
          <div className="actions">
            <CustomButton onClick={handleUpdateClick}>Update Project</CustomButton>
            <CustomButton onClick={handleCancelClick}>Cancel</CustomButton>
          </div>
          <div className="assign-user">
            <h4>Assign User to Project</h4>
            <select name="assignee" value={formValues.assignee} onChange={handleInputChange}>
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user.user_id} value={user.user_id}>{user.username}</option>
              ))}
            </select>
            <input
              type="text"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Role"
            />
            <CustomButton onClick={handleAssignClick}>Assign User</CustomButton>
          </div>
          <div className="project-members">
            <h4>Project Members</h4>
            {projectMembers.length > 0 ? (
              <ul>
                {projectMembers.map((member) => (
                  <li key={member.user_id}>
                    {member.user.username} - {member.role}
                    <button onClick={() => handleRemoveClick(member.user_id)}>Remove</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No members assigned</p>
            )}
          </div>
        </div>
      )}

      {isCreating && (
        <div className="create-project">
          <h3>Create New Project</h3>
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            placeholder="Project Name"
          />
          <textarea
            name="description"
            value={formValues.description}
            onChange={handleInputChange}
            placeholder="Project Description"
          />
          <select name="assignee" value={formValues.assignee} onChange={handleInputChange}>
            <option value="">Select User</option>
            {users.map((user) => (
              <option key={user.user_id} value={user.user_id}>{user.username}</option>
            ))}
          </select>
          <input
            type="text"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
          />
          <CustomButton onClick={handleSaveClick}>Save Project</CustomButton>
          <CustomButton onClick={handleCancelClick}>Cancel</CustomButton>
        </div>
      )}
      </div>
    </div>
  );
};
export default ProjectsPage;
