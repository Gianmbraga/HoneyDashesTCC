import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Atualizando Switch para Routes

import DashboardMetricas from './screens/DashboardMetricas';
import Menu from './screens/Menu';
// import DashboardElements from './screens/DashboardElements';
import DashboardSVM from './screens/DashboardSVM';
import DashboardKNN from './screens/DashboardKNN';
import DashboardGNB from './screens/DashboardGNB';

const RouteManagment = () => {
    return (
        <BrowserRouter>
            <Routes>  {/* Atualizando Switch para Routes */}
                <Route path="/GNB" element={<DashboardGNB />} />
                <Route path="/SVM" element={<DashboardSVM />} />
                <Route path="/KNN" element={<DashboardKNN />} />
                <Route path="/RandomForest" element={<DashboardMetricas />} />  {/* Atualizando component para element */}
                <Route path="/Menu" element={<Menu />} />
                <Route path="*" element={<Menu />} />  {/* Atualizando component para element */}
            </Routes>
        </BrowserRouter>
    );
};

export default RouteManagment;

