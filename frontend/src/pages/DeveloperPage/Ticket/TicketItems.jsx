/* eslint-disable react/prop-types */
// TicketItem.jsx
import { useDraggable } from '@dnd-kit/core';
import { useSelector } from 'react-redux';

const ticketStyle = {
  padding: '8px',
  margin: '8px 0',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '4px',
  cursor: 'pointer'
};

const TicketItem = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id
  });

  const issue = useSelector((state) => state.issues.issues.find((issue) => issue.id === id));

  const style = {
    ...ticketStyle,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined
  };

  if (!issue) {
    return null;
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div>Issue Title: {issue.title}</div>
      <div>Description: {issue.description}</div>
      <div>Severity: {issue.severity}</div>
      <div>Priority: {issue.priority}</div>
    </div>
  );
};

export default TicketItem;
