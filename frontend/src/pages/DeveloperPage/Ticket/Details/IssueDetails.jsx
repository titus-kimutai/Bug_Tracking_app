import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Button, Input, HStack, Heading, Text, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { fetchIssues } from '../../../../features/issues/issueSlice';
import { fetchCommentsByIssueId, addComment } from '../../../../features/comments/commentSlice';

const IssueDetails = () => {
  const { projectId, issueId } = useParams();
  const dispatch = useDispatch();
  const { issues, isLoading: issuesLoading, isError: issuesError, message: issuesMessage } = useSelector((state) => state.issues);
  const { comments, isLoading: commentsLoading, isError: commentsError, message: commentsMessage } = useSelector((state) => state.comments);

  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    dispatch(fetchIssues(projectId));
    dispatch(fetchCommentsByIssueId(issueId)); 
  }, [dispatch, projectId, issueId]);

  const issue = issues.find((issue) => issue.issue_id === parseInt(issueId));

  const handleAddComment = () => {
    if (!newComment.trim() || !issue) return; 
    const commentData = {
      issue_id: parseInt(issueId),
      content: newComment,
      user_id: issue.assignee_id || null  // Handle cases where assignee_id might be undefined
    };

    dispatch(addComment(commentData));
    setNewComment('');
  };

  if (issuesLoading || commentsLoading) return <Spinner size="lg" />;
  if (issuesError) return (
    <Alert status="error" mb={4}>
      <AlertIcon />
      {issuesMessage}
    </Alert>
  );
  if (commentsError) return (
    <Alert status="error" mb={4}>
      <AlertIcon />
      {commentsMessage}
    </Alert>
  );

  return (
    <Box p={5} maxW="container.xl" mx="auto">
      <HStack spacing={4} align="start">
        <Box p={4} borderWidth="1px" borderRadius="md" w="50%">
          <Heading size="md" mb={4}>Issue Details</Heading>
          {issue ? (
            <>
              <Text mb={2}><strong>Title:</strong> {issue.title}</Text>
              <Text mb={2}><strong>Description:</strong> {issue.description}</Text>
              <Text mb={2}><strong>Status:</strong> {issue.status}</Text>
              <Text mb={2}><strong>Priority:</strong> {issue.priority}</Text>
              <Text mb={2}><strong>Severity:</strong> {issue.severity}</Text>
              <Text mb={2}><strong>Reporter:</strong> {issue.reporter_id}</Text>
              <Text mb={2}><strong>Assignee:</strong> {issue.assignee_id}</Text>
            </>
          ) : (
            <Text>No issue details found.</Text>
          )}
        </Box>

        <Box p={4} borderWidth="1px" borderRadius="md" w="50%">
          <Heading size="md" mb={4}>Comments</Heading>
          {Array.isArray(comments) && comments.length === 0 ? (
            <Text>No comments found.</Text>
          ) : (
            Array.isArray(comments) && comments.map((comment) => (
              <Box key={comment.comment_id} p={2} borderWidth="1px" borderRadius="md" mb={2}>
                <Text><strong>User ID:</strong> {comment.user_id}</Text>
                <Text><strong>Comment:</strong> {comment.content}</Text>
              </Box>
            ))
          )}
          <Input
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            mb={2}
          />
          <Button onClick={handleAddComment} colorScheme="blue">Add Comment</Button>
        </Box>
      </HStack>
    </Box>
  );
};

export default IssueDetails;
