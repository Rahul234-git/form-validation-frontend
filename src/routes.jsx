import React from "react";
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Home from "./Components/Home";


const MainRouter = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
            </Routes>



        </Router>
    )
}

export default MainRouter;