import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Axel - don't have keys in the repo.
const firebaseConfig = {
  apiKey: "AIzaSyCddyR5HIyN7HCuYQC1aerjZ-S661gyY_4",
  authDomain: "foocoding-react-project.firebaseapp.com",
  projectId: "foocoding-react-project",
  storageBucket: "foocoding-react-project.appspot.com",
  messagingSenderId: "220559208690",
  appId: "1:220559208690:web:ca240e9765ab3a6ed3206b",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);