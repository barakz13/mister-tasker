import { TaskPreview } from './TaskPreview';
import { useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { getDate } from '../services/util-service';

export function TaskList({ tasks }) {
  useEffect(() => {
    console.log(tasks);

    return () => {};
  }, []);

  const rows = tasks.map((task) => ({
    ...task,
    createdAt: getDate(task.createdAt),
  }));

  const columns = [
    { field: 'title', headerName: 'Title', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'importance', headerName: 'Importance', width: 150 },
    {
      field: 'createdAt',
      headerName: 'Created At',
      width: 150,
    },
  ];

  return (
    <section className="task-list-section">
      {/* <ul className="task-list flex column">
        {tasks.map((task) => (
          <TaskPreview task={task} key={task.id} />
        ))}
      </ul> */}
      <div style={{ height: 300, width: '50%', marginLeft: '25%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </section>
  );
}
