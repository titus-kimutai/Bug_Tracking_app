
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssues, reset } from '../../features/issues/issueSlice';
import { useNavigate } from 'react-router-dom';
import { styles } from './styles';
import './issue.css';

const TicketsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { issues, isLoading, isError, isSuccess, message } = useSelector((state) => state.issues);

  useEffect(() => {
    dispatch(fetchIssues());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const handleAddIssueClick = () => {
    navigate('/home/create');
  };

  return (
    <div>
      <div className='container'>
        <div className="title">
           <h2>Tickets</h2>
        </div>
        <button onClick={handleAddIssueClick} style={styles.addButton}>Add New Issue</button>
        {isLoading && <p>Loading...</p>}
        {isError && <p style={styles.error}>{message}</p>}
        {isSuccess && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Description</th>
                <th style={styles.tableHeader}>Status</th>
                <th style={styles.tableHeader}>Priority</th>
                <th style={styles.tableHeader}>Severity</th>
                <th style={styles.tableHeader}>Project Id</th>
                <th style={styles.tableHeader}>Assignee Id</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => (
                <tr key={issue.issue_id} style={styles.tableRow}>
                  <td style={styles.tableCell}>{issue.title}</td>
                  <td style={styles.tableCell}>{issue.description}</td>
                  <td style={styles.tableCell}>{issue.status}</td>
                  <td style={styles.tableCell}>{issue.priority}</td>
                  <td style={styles.tableCell}>{issue.severity}</td>
                  <td style={styles.tableCell}>{issue.project_id}</td>
                  <td style={styles.tableCell}>{issue.assignee_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
export default TicketsPage