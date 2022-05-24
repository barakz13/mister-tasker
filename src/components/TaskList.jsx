import { TaskPreview } from './TaskPreview';
import { useEffect } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { getTime2 } from '../services/util-service';

export function TaskList({ tasks }) {
  useEffect(() => {
    console.log(tasks);

    return () => {};
  }, []);

  const rows = tasks.map((task) => ({
    ...task,
    createdAt: getTime2(task.createdAt),
  }));

  const columns = [
    {
      field: 'title',
      headerName: 'Title',
      width: 150,
      renderCell: (params) => (
        <Link to={`/task/${params.id}`}>{params.value}</Link>
      ),
    },
    { field: 'status', headerName: 'Status', width: 150 },
    { field: 'importance', headerName: 'Importance', width: 150 },
    { field: 'status', headerName: 'Status', width: 150 },
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
      <div style={{ height: 300, width: '70%', marginLeft: '15%' }}>
        <DataGrid rows={rows} columns={columns} />
      </div>
    </section>
  );
}
