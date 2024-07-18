/* eslint-disable react/prop-types */
import { useDroppable } from '@dnd-kit/core';

const containerStyle = {
  border: '1px solid #ccc',
  borderRadius: '4px',
  padding: '16px',
  width: '200px',
  minHeight: '400px',
  backgroundColor: '#f9f9f9'
};

const Container = ({ id, title, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} style={containerStyle}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

export default Container;
