import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDPHQ7wE-9nW8vGljZ7RhMYxeP5npdbtQQ",
  authDomain: "renkireparation.firebaseapp.com",
  projectId: "renkireparation",
  storageBucket: "renkireparation.firebasestorage.app",
  messagingSenderId: "673702110991",
  appId: "1:673702110991:web:2dda01217e67df01af007a"
};

const app = initializeApp(firebaseConfig);
export default app;
