import { taskService } from '../services/task-service';
import { useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { getDate, getTime, getTime2 } from '../services/util-service';
import { withRouter } from 'react-router-dom';

function _TaskList({ tasks, onSaveTask, onStartWorker, isWorkerOn, history }) {
  useEffect(() => {
    console.log(tasks);
    // console.log('did mount');
    console.log(isWorkerOn);
    return () => {};
  }, []);

  const onGoToEdit = (id) => {
    console.log(history);
    history.push(`/task/edit/${id}`);
  };
  const onGoToDetails = (id) => {
    history.push(`/task/${id}`);
  };

  const rows = tasks.map((task) => ({
    ...task,
    createdAt: getTime2(task.createdAt.seconds),
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
    {
      field: 'action',
      headerName: 'Actions',
      width: 250,
      renderCell: (params) => {
        return (
          <section className="actions-cell">
            {params.row.status === 'New' || params.row.status === 'Failed' ? (
              <button
                className="actions-cell-btn btn-start-retry btn"
                onClick={() => onSaveTask(params.id)}
              >
                {params.row.status === 'New' ? 'Start' : 'Retry'}
              </button>
            ) : (
              ''
            )}
            <button
              onClick={() => onGoToDetails(params.id)}
              className="actions-cell-btn btn-details btn"
            >
              Details
            </button>
            <button
              onClick={() => onGoToEdit(params.id)}
              className="actions-cell-btn btn-edit btn"
            >
              Edit
            </button>
          </section>
        );
      },
    },
  ];

  return (
    <section className="task-list-section flex column align-center space-evenly">
      {/* <ul className="task-list flex column">
        {tasks.map((task) => (
          <TaskPreview task={task} key={task.id} />
        ))}
      </ul> */}
      <div className="task-list">
        <DataGrid className="data-grid" rows={rows} columns={columns} />
      </div>
    </section>
  );
}

export const TaskList = withRouter(_TaskList);
