import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "../components/layout/Layout";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Tasks = lazy(() => import("../pages/Tasks"));
const NotFound = lazy(() => import("../pages/NotFound"));

export default function AppRouter() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/task" element={<Tasks />} />
                </Route>

                <Route path="*" element={<NotFound />} />
            </Routes>
        </Suspense>
    );
}