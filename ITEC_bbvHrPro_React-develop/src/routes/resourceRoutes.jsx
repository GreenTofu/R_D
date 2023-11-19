import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import CandidateList from "pages/resources/candidateList";
import Dashboard from "pages/resources/dashboard";
import EmployeeList from "pages/resources/employeeList";
import Profile from "pages/resources/profile";
import ProjectDetails from "pages/resources/projectDetails/projectDetails";
import ProjectList from "pages/resources/projectList";

import ManagerRoute from "./utils/managerRoute";
import ProfileRoute from "./utils/profileRoute";

const ResourceRoutes = () => {
  return (
    <Routes>
      <Route index element={<Navigate to="dashboard"/>}/>
      <Route path="projects/:id" element={<ProjectDetails />} />

      <Route element={<ProfileRoute />}>
        <Route path="employees/:id" element={<Profile />} />
      </Route>

      <Route element={<ManagerRoute />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="candidates" element={<CandidateList />} />
        <Route path="projects" element={<ProjectList />} />
      </Route>
    </Routes>
  );
};

export default ResourceRoutes;
