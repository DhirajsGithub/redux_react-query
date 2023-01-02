
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// stored to 210030010@iitdh.ac.in account
const firebaseConfig = {
  apiKey: "AIzaSyBd-eN_gO-zmL0ap0LNNxdrifBaNhC0LpQ",
  authDomain: "dchat-storage-profile-image.firebaseapp.com",
  projectId: "dchat-storage-profile-image",
  storageBucket: "dchat-storage-profile-image.appspot.com",
  messagingSenderId: "1088386757906",
  appId: "1:1088386757906:web:c6b4796a18bca7def0efcb"
};

export default firebaseConfig;
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)



/*
working with firebase files 
$ npm install firebase

*/