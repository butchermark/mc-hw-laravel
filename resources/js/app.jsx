import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import "./index.css";
import GlobalStyle from "./GlobalStyle";

const rootElement = document.getElementById("app");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <GlobalStyle />
            <App />
        </React.StrictMode>
    );
} else {
    console.error("Element with ID 'app' not found.");
}
