//Post React 18
import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root');

// Create a root.
const root = createRoot(document.getElementById('root'));

// Initial render
root.render(<App/>);

//Pre 18
// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );