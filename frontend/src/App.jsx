import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Login from './pages/loginPage/login';
import Register from './pages/registerPage/register';
import HomePage from './pages/HomePage/homepage';
import ProjectsPage from './pages/projectPage/projects';
import TicketsPage from './pages/TicketsPage/issues';
import AdminPage from './pages/AdminPage/admin';
import DevPage from './pages/DeveloperPage/dev';
import Ticket from './pages/DeveloperPage/Ticket/Ticket';
import Projects from './pages/DeveloperPage/projects/Projects';
import TicketDetails from './pages/DeveloperPage/ViewD/Details';
import IssueDetails from './pages/DeveloperPage/Ticket/Details/IssueDetails';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />}>
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="issues" element={<TicketsPage />} />
            <Route path="create" element={<TicketsPage />} />
          </Route>
          <Route path="/admin" element={<AdminPage />}>
            <Route path="projects" element={<ProjectsPage />} />
            <Route path="issue" element={<TicketsPage />} />
          </Route>
          <Route path="/developer" element={<DevPage />}>
             <Route path ="projects" element={<Projects/>}/>
             <Route path="projects/:projectId/issues" element={<TicketDetails />} />
              <Route path="projects/:projectId/issues/:issueId" element={<IssueDetails />} />
             <Route path ="Ticket" element={<Ticket/>}/>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
