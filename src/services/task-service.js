// import { storageService } from './storage-service.js'
import { httpService } from './http.service';
import { utilService } from './util.service.js';
import { firebaseService } from './firebase-service';

const COLLECTION_NAME = 'tasks';

export const taskService = {
  query,
  getById,
  remove,
  save,
  startTask,
  startStopWorker,
  getEmptyTask,
};

async function query(filterBy) {
  return await firebaseService.getDocuments(COLLECTION_NAME);
}

async function getById(taskId) {
  return await firebaseService.getDocument(COLLECTION_NAME, taskId);
}

// async function remove(taskId) {
//   return await firebaseService.getDocument(COLLECTION_NAME, taskId);
// }

async function save(task) {
  const savedTask = task._id
    ? await firebaseService.updateDocument(COLLECTION_NAME, task)
    : await firebaseService.addDocument(COLLECTION_NAME, task);
  return savedTask;
}

async function remove(task) {
  return await firebaseService.deleteDocument(COLLECTION_NAME, task);
}

// async function startTask(task) {
//   return await httpService.put(`task/${task._id}/start`, task);
// }

// async function startStopWorker(isWorkerOn) {
//   return await httpService.put(`task/workerrunning`, { isWorkerOn });
// }

function getEmptyTask(title, description = '', importance = 1) {
  return {
    title,
    status: 'New',
    description,
    importance,
    // lastTriedAt: null,
    triesCount: 0,
    doneAt: null,
    // errors: [],
  };
}
