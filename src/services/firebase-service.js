import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  where,
  getDoc,
  doc,
  setDoc,
  limit,
  startAfter,
  orderBy,
  deleteDoc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';

const pageSize = 8;
var gLastDocForPaging = null;

export const firebaseService = {
  getDocuments,
  getDocument,
  addDocument,
  deleteDocument,
  updateDocument,
  subscribe,
};

const firebaseConfig = {
  apiKey: 'AIzaSyDYzOzoP-6xn0Ouk7qKtOcgF0q70QMXaqc',
  authDomain: 'mister-tasker-99ddd.firebaseapp.com',
  projectId: 'mister-tasker-99ddd',
  storageBucket: 'mister-tasker-99ddd.appspot.com',
  messagingSenderId: '221241917122',
  appId: '1:221241917122:web:de630d5566d2967b09055b',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

window.query = getDocuments;

async function addDocument(collectionName, document) {
  const db = getFirestore(app);
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...document,
      createdAt: serverTimestamp(),
    });
    // console.log("Doc saved. id: ", docRef.id)
    return docRef;
  } catch (err) {
    console.error('Error adding document: ', err);
    throw err;
  }
}

async function getDocument(collectionName, id) {
  const db = getFirestore();
  const snap = await getDoc(doc(db, collectionName, id));

  if (!snap.exists()) {
    return null;
  }
  const docToReturn = snap.data();
  docToReturn.id = id;
  return docToReturn;
}

async function updateDocument(collectionName, document, id) {
  const db = getFirestore();
  // returns undefined
  await setDoc(doc(db, collectionName, id), document, { merge: true });
}

async function deleteDocument(collectionName, document) {
  const db = getFirestore();
  await deleteDoc(doc(db, collectionName, document));
}

async function getDocuments(collectionName, filterBy) {
  const db = getFirestore();
  var collectionRef = collection(db, collectionName);
  var orderByParams = [];
  if (filterBy?.byUserId) {
    collectionRef = query(
      collectionRef,
      where('byUser.id', '==', filterBy.byUserId)
    );
  }
  // collectionRef = query(collectionRef, limit(pageSize))
  // if (filterBy.pageNo && gLastDocForPaging) {
  //     collectionRef = query(collectionRef, startAfter(gLastDocForPaging))
  // }
  const querySnapshot = await getDocs(collectionRef);
  console.log(querySnapshot);
  gLastDocForPaging = querySnapshot.docs[querySnapshot.docs.length - 1];
  const docs = [];
  querySnapshot.forEach(doc => {
    // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
    docs.push({ id: doc.id, ...doc.data() });
  });
  return docs;
}

// Does not work
function subscribe(collectionName, cb) {
  const db = getFirestore();
  const docs = [];
  const unsub = onSnapshot(collection(db, collectionName), querySnapshot => {
    // console.log("Current data: ", querySnapshot.docs);
    querySnapshot.forEach(doc => {
      // console.log(`${doc.id} => ${JSON.stringify(doc.data())}`)
      docs.push({ id: doc.id, ...doc.data() });
    });
    cb(docs);
  });
}
