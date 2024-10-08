import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Atualizando Switch para Routes

import Login from './screens/Login';

const RouteManagment = () => {
    return (
        <BrowserRouter>
            <Routes>  {/* Atualizando Switch para Routes */}
                <Route path="/Login" element={<Login />} />  {/* Atualizando component para element */}
                {/* 
                <Route path="/LoginRedirect" element={<LoginRedirect />} />
                <PrivateRoute path="/Menu" element={<AdminPainel />} />
                <PrivateRoute path='/Oportunidade' element={<OportunidadeInfo />} />
                <PrivateRoute path="/ExemploDash1" element={<ExemploDashboard1 />} />
                <PrivateRoute path="/ExemploDash2" element={<ExemploDashboard2 />} /> 
                */}
                <Route path="*" element={<Login />} />  {/* Atualizando component para element */}
            </Routes>
        </BrowserRouter>
    );
};

export default RouteManagment;

