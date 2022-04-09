import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Game } from "./pages/Game";
import { Games } from "./pages/Games";
import { Home } from "./pages/Home";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Routes>
                <Route path={`${process.env.PUBLIC_URL}/`} element={<Home />} />
                <Route path={`${process.env.PUBLIC_URL}/games`} element={<Games />} />
                <Route path={`${process.env.PUBLIC_URL}/game/:name`} element={<Game />} />
            </Routes>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
