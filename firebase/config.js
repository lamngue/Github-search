import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_PRIVATE_GITHUB_TOKEN,
};

export const app = initializeApp(firebaseConfig);
