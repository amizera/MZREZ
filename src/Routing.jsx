import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home/Home'
import Projects from './Pages/Projects/Projects'
import Layout from './Layout/Layout';

export const HomeRoute = "/";
export const ProjectsRoute = "/projects/";

class Routing extends React.Component {
    render() {
        return (
            <Layout>
                <Routes>
                    <Route path={HomeRoute} element={<Home/>} />
                    <Route path={ProjectsRoute} element={<Projects/>} />
                </Routes>

            </Layout >
        );
    }
}
export default Routing;