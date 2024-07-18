/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProjects, reset } from '../../../features/project/projectSlice';
import {
  Button,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, isLoading, isError, isSuccess, message } = useSelector((state) => state.projects);

  useEffect(() => {
    dispatch(fetchProjects());

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <Container maxW="container.xl" p={4}>
      <Heading mb={6}>Available Projects</Heading>

      {isLoading && <Spinner size="lg" />}
      {isError && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {message}
        </Alert>
      )}
      {isSuccess && Array.isArray(projects) && (
        <Table variant="simple" mb={6} size={{ base: 'sm', md: 'md' }}>
          <Thead>
            <Tr>
              <Th>Project Name</Th>
              <Th>Project Date</Th>
              <Th>Details</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((project) => (
              <Tr key={project.project_id}>
                <Td>{project.name}</Td>
                <Td>{project.created_at}</Td>
                <Td>
                  <Button colorScheme="blue" as={Link} to={`/developer/projects/${project.project_id}/issues`}>
                    View Details
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Container>
  );
};

export default Projects;
