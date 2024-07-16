import  { useEffect, useState } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import {SortableContext } from '@dnd-kit/sortable';
import { fetchIssues, updateIssueStatus } from '../../../features/issues/issueSlice';
import { useDispatch } from 'react-redux';
import Container from './container';
import TicketItem from './TicketItems';

const statusMap = {
  root: 'new',
  container1: 'open',
  container2: 'in progress',
  container3: 'completed'
};

const Ticket = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState({
    root: [],
    container1: [],
    container2: [],
    container3: []
  });

  useEffect(() => {
    dispatch(fetchIssues()).then((action) => {
      if (fetchIssues.fulfilled.match(action)) {
        const fetchedIssues = action.payload;
        setItems({
          root: fetchedIssues.filter(issue => issue.status === 'new').map(issue => issue.issue_id),
          container1: fetchedIssues.filter(issue => issue.status === 'open').map(issue => issue.issue_id),
          container2: fetchedIssues.filter(issue => issue.status === 'in progress').map(issue => issue.issue_id),
          container3: fetchedIssues.filter(issue => issue.status === 'completed').map(issue => issue.issue_id)
        });
      }
    });
  }, [dispatch]);

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeContainer = findContainer(active.id);
      const overContainer = findContainer(over.id);

      if (activeContainer !== overContainer) {
        setItems((prev) => ({
          ...prev,
          [activeContainer]: prev[activeContainer].filter((id) => id !== active.id),
          [overContainer]: [...prev[overContainer], active.id]
        }));

        const newStatus = statusMap[overContainer];
        dispatch(updateIssueStatus({ issueId: active.id, newStatus }));
      }
    }
  };

  const findContainer = (id) => {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <SortableContext items={items.root}>
          <Container id="root" title="New Issues">
            {items.root.map((id) => (
              <TicketItem key={id} id={id} />
            ))}
          </Container>
        </SortableContext>
        <SortableContext items={items.container1}>
          <Container id="container1" title="Open Issues">
            {items.container1.map((id) => (
              <TicketItem key={id} id={id} />
            ))}
          </Container>
        </SortableContext>
        <SortableContext items={items.container2}>
          <Container id="container2" title="In Progress">
            {items.container2.map((id) => (
              <TicketItem key={id} id={id} />
            ))}
          </Container>
        </SortableContext>
        <SortableContext items={items.container3}>
          <Container id="container3" title="Completed">
            {items.container3.map((id) => (
              <TicketItem key={id} id={id} />
            ))}
          </Container>
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default Ticket;
