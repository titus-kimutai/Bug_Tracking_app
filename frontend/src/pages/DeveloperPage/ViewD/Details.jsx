import { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIssuesByProjectId, reset } from '../../../features/project/projectSlice';
import { createIssue } from '../../../features/issues/issueSlice';
import { useParams, Link, useNavigate } from 'react-router-dom';

const TicketDetails = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projects, issues, isLoading, isError, message } = useSelector((state) => state.projects);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [newIssue, setNewIssue] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    severity: '',
    reporter_id: '', 
    assignee_id: '',
  });

  useEffect(() => {
    dispatch(fetchIssuesByProjectId(projectId));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, projectId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIssue({ ...newIssue, [name]: value });
  };

  const handleCreateIssue = () => {
    const issueData = { ...newIssue, project_id: parseInt(projectId) };
    dispatch(createIssue(issueData))
      .then(() => {
        dispatch(fetchIssuesByProjectId(projectId));
        onClose();
      });
  };

  const handleIssueDetails = (issueId) => {
    navigate(`/developer/projects/${projectId}/issues/${issueId}`);
  };

  if (isLoading) return <Spinner size="lg" />;
  if (isError) return (
    <Alert status="error" mb={4}>
      <AlertIcon />
      {message}
    </Alert>
  );

  const project = projects.find((proj) => proj.project_id === parseInt(projectId));
  const projectIssues = issues.filter((issue) => issue.project_id === parseInt(projectId));

  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <VStack spacing={4} align="start">
        <Box display="flex" flexDirection={{ base: 'column', md: 'row' }} w="100%" gap={4}>
          <Box p={4} borderWidth="1px" borderRadius="md" w={{ base: '100%', md: '30%' }}>
            <Heading size="md" mb={6}>Project Information</Heading>
            {project ? (
              <>
                <Text mb={2}><strong>Name:</strong> {project.name}</Text>
                <Text mb={2}><strong>Created At:</strong> {project.created_at}</Text>
                <Text mb={4}><strong>Description:</strong> {project.description}</Text>
                <Button colorScheme="blue" onClick={onOpen}>Create New Issue</Button>
              </>
            ) : (
              <Text>No project information found.</Text>
            )}
          </Box>

          <Box p={4} borderWidth="1px" borderRadius="md" w={{ base: '100%', md: '70%' }}>
            <Heading size="md" mb={4}>Ticket Details</Heading>
            {projectIssues.length === 0 ? (
              <Text>No tickets related with this project</Text>
            ) : (
              <Table variant="simple">
                <Thead>
                  <Tr>
                    <Th>Title</Th>
                    <Th>Description</Th>
                    <Th>Status</Th>
                    <Th>Assignee</Th>
                    <Th>Created At</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {projectIssues.map((issue) => (
                    <Tr key={issue.issue_id}>
                      <Td>{issue.title}</Td>
                      <Td>{issue.description}</Td>
                      <Td>{issue.status}</Td>
                      <Td>{issue.assignee_id}</Td>
                      <Td>{issue.created_at}</Td>
                      <Td>
                        <Button colorScheme="blue" size="sm" onClick={() => handleIssueDetails(issue.issue_id)}>Details</Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            )}
          </Box>
        </Box>

        <Button as={Link} to={`/developer/projects`} colorScheme="blue">
          Back to Projects
        </Button>
      </VStack>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Issue</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel htmlFor="title">Title</FormLabel>
              <Input id="title" name="title" value={newIssue.title} onChange={handleInputChange} placeholder="Issue Title" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="description">Description</FormLabel>
              <Input id="description" name="description" value={newIssue.description} onChange={handleInputChange} placeholder="Issue Description" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="status">Status</FormLabel>
              <Select id="status" name="status" value={newIssue.status} onChange={handleInputChange} placeholder="Select Status">
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="priority">Priority</FormLabel>
              <Select id="priority" name="priority" value={newIssue.priority} onChange={handleInputChange} placeholder="Select Priority">
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="severity">Severity</FormLabel>
              <Select id="severity" name="severity" value={newIssue.severity} onChange={handleInputChange} placeholder="Select Severity">
                <option value="minor">Minor</option>
                <option value="major">Major</option>
                <option value="critical">Critical</option>
              </Select>
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="reporter_id">Reporter ID</FormLabel>
              <Input id="reporter_id" name="reporter_id" value={newIssue.reporter_id} onChange={handleInputChange} placeholder="Reporter ID" />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel htmlFor="assignee_id">Assignee ID</FormLabel>
              <Input id="assignee_id" name="assignee_id" value={newIssue.assignee_id} onChange={handleInputChange} placeholder="Assignee ID" />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCreateIssue}>Create</Button>
            <Button colorScheme="gray" ml={3} onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default TicketDetails;
