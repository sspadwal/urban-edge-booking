import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";

import { Suspense, lazy } from "react";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";

// Lazy load non-critical pages
const Services = lazy(() => import("./pages/Services"));
const Barbers = lazy(() => import("./pages/Barbers"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Contact = lazy(() => import("./pages/Contact"));
const Booking = lazy(() => import("./pages/Booking"));
const MyBookings = lazy(() => import("./pages/MyBookings"));
const AdminPanel = lazy(() => import("./pages/AdminPanel"));
const AdminBookings = lazy(() => import("./pages/AdminBookings"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));

// Loading spinner
const Loading = () => (
  <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Routes with MainLayout (includes navbar) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="services" element={<Services />} />
                <Route path="barbers" element={<Barbers />} />
                <Route path="gallery" element={<Gallery />} />
                <Route path="contact" element={<Contact />} />

                {/* Protected Routes */}
                <Route path="book" element={
                  <ProtectedRoute><Booking /></ProtectedRoute>
                } />
                <Route path="my-bookings" element={
                  <ProtectedRoute><MyBookings /></ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="admin" element={
                  <ProtectedRoute adminOnly={true}><AdminPanel /></ProtectedRoute>
                } />
                <Route path="admin/bookings" element={
                  <ProtectedRoute adminOnly={true}><AdminBookings /></ProtectedRoute>
                } />
              </Routes>
            </Suspense>
          } />
        </Route>

        {/* Auth routes with different layout (no navbar) */}
        <Route path="/admin-login" element={
          <Suspense fallback={<Loading />}>
            <AdminLogin />
          </Suspense>
        } />
      </Routes>
    </BrowserRouter>
  );
}
