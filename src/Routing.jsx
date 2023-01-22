import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from './Pages/Home/Home'
import Lacalizations from './Pages/Lacalizations/Lacalizations'
import Reservations from './Pages/Lacalizations/Reservations'
import Layout from './Layout/Layout';


export const HomeRoute = "/";
export const LacalizationsRoute = "/lokalizacje/";
export const ReservationsRoute = "/rezerwacje/"

class Routing extends React.Component {
    render() {
        return (
            <Layout>
                <Routes>
                    <Route path={HomeRoute} element={<Home/>} />
                    <Route path={LacalizationsRoute} element={<Lacalizations/>} />
                    <Route path={ReservationsRoute} element={<Reservations/>} />
                </Routes>
            </Layout >
        );
    }
}
export default Routing;