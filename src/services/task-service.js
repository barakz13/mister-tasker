// import { storageService } from './storage-service.js'
import { makeId } from './util-service';
import { firebaseService } from './firebase-service';
import { externalService } from './externalService';

const COLLECTION_NAME = 'task';

export const taskService = {
  query,
  getById,
  remove,
  save,
  getEmptyTask,
};

async function query() {
  const tasks = await firebaseService.getDocuments(COLLECTION_NAME);
  return tasks;
}

async function getById(taskId) {
  return await firebaseService.getDocument(COLLECTION_NAME, taskId);
}

// async function remove(taskId) {
//   return await firebaseService.getDocument(COLLECTION_NAME, taskId);
// }

async function save(task) {
  const savedTask = task.id
    ? await firebaseService.updateDocument(COLLECTION_NAME, task, task.id)
    : await firebaseService.addDocument(COLLECTION_NAME, task);
  return savedTask;
}

async function remove(task) {
  return await firebaseService.deleteDocument(COLLECTION_NAME, task);
}

function getEmptyTask() {
  return {
    title: '',
    status: 'New',
    description: '',
    importance: 1,
    lastTriedAt: null,
    triesCount: 0,
    doneAt: null,
    errors: [],
  };
}
