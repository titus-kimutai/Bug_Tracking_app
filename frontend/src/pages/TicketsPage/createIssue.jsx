import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createIssue } from '../../features/issues/issueSlice';
import { fetchProjects } from '../../features/project/projectSlice';
import { fetchUsers } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';
import './issue.css';

const AddIssuePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects } = useSelector((state) => state.projects);
  const { user, users } = useSelector((state) => state.auth);
  console.log(users)

  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    severity: '',
    project_id: '',
    reporter_id: user ? user.user_id : '',
    assignee_id: user ? user.user_id: '',
  });

  useEffect(() => {
    dispatch(fetchProjects());
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      setFormValues((prevValues) => ({
        ...prevValues,
        reporter_id: user.user_id,
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSaveClick = () => {
    dispatch(createIssue(formValues)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        navigate('/home/issues');
      }
    });
  };

  return (
    <div className="container">
      <div className="title">
        <h2>Add New Issue</h2>
      </div>
      <input
        type="text"
        name="title"
        value={formValues.title}
        onChange={handleInputChange}
        placeholder="Title"
      />
      <textarea
        name="description"
        value={formValues.description}
        onChange={handleInputChange}
        placeholder="Description"
      />
      <input
        type="text"
        name="status"
        value={formValues.status}
        onChange={handleInputChange}
        placeholder="Status"
      />
      <input
        type="text"
        name="priority"
        value={formValues.priority}
        onChange={handleInputChange}
        placeholder="Priority"
      />
      <input
        type="text"
        name="severity"
        value={formValues.severity}
        onChange={handleInputChange}
        placeholder="Severity"
      />
      <input
        type="number"
        name="reporter_id"
        value={formValues.reporter_id}
        onChange={handleInputChange}
        placeholder="Reporter ID"
      />
    
      <select name="project_id" value={formValues.project_id} onChange={handleInputChange}>
        <option value="">Select Project</option>
        {projects.map((project) => (
          <option key={project.project_id} value={project.project_id}>
            {project.name}
          </option>
        ))}
      </select>
      <button onClick={handleSaveClick} style={styles.saveButton}>Save Issue</button>
    </div>
  );
};

export default AddIssuePage;
