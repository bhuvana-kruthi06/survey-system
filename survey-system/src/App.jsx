import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import LoginPage from "./pages/LoginPage";
import SurveyPage from "./pages/SurveyPage";
import SurveyBuilder from "./pages/SurveyBuilder";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/survey/:id" element={
            <ProtectedRoute><AppLayout><SurveyPage /></AppLayout></ProtectedRoute>
          }/>
          <Route path="/builder" element={
            <ProtectedRoute><AppLayout><SurveyBuilder /></AppLayout></ProtectedRoute>
          }/>
          <Route path="/dashboard" element={
            <ProtectedRoute><AppLayout><Dashboard /></AppLayout></ProtectedRoute>
          }/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}