import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Clock, Scissors, CheckCircle, XCircle } from "lucide-react";

const AdminPanel = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: "", duration: "" });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/services`);
      const data = await response.json();
      setServices(data);
    } catch (error) {
      showNotification("Failed to fetch services", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.duration) {
      showNotification("Please fill all fields", "error");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/services`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          duration: parseInt(formData.duration),
        }),
      });

      if (response.ok) {
        showNotification("Service added successfully!", "success");
        setFormData({ name: "", duration: "" });
        fetchServices();
      } else {
        showNotification("Failed to add service", "error");
      }
    } catch (error) {
      showNotification("Failed to add service", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this service?")) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/services/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        showNotification("Service deleted successfully!", "success");
        fetchServices();
      } else {
        showNotification("Failed to delete service", "error");
      }
    } catch (error) {
      showNotification("Failed to delete service", "error");
    }
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-black pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-white mb-2">Admin Panel</h1>
          <p className="text-neutral-400">Manage your barbershop services</p>
        </div>

        {/* Notification */}
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${notification.type === "success"
              ? "bg-green-500/10 border border-green-500/20 text-green-400"
              : "bg-red-500/10 border border-red-500/20 text-red-400"
              }`}
          >
            {notification.type === "success" ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            <span>{notification.message}</span>
          </motion.div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Add Service Form */}
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Plus className="w-5 h-5 text-amber-500" />
              </div>
              <h2 className="text-2xl font-black text-white">Add New Service</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Service Name
                </label>
                <div className="relative">
                  <Scissors className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g., Haircut, Beard Trim"
                    className="w-full pl-11 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-white mb-2">
                  Duration (minutes)
                </label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) =>
                      setFormData({ ...formData, duration: e.target.value })
                    }
                    placeholder="e.g., 30, 45, 60"
                    min="1"
                    className="w-full pl-11 pr-4 py-3 bg-neutral-800 border border-white/10 rounded-lg text-white placeholder-neutral-500 focus:border-amber-500 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 font-black rounded-lg shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {loading ? "Adding..." : "Add Service"}
              </motion.button>
            </form>
          </div>

          {/* Services List */}
          <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                <Scissors className="w-5 h-5 text-amber-500" />
              </div>
              <h2 className="text-2xl font-black text-white">All Services</h2>
            </div>

            {loading && services.length === 0 ? (
              <div className="text-center py-8 text-neutral-400">
                Loading services...
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-8 text-neutral-400">
                No services added yet
              </div>
            ) : (
              <div className="space-y-3">
                {services.map((service) => (
                  <motion.div
                    key={service._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-neutral-800 border border-white/10 rounded-lg p-4 flex items-center justify-between hover:border-amber-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center">
                        <Scissors className="w-5 h-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{service.name}</h3>
                        <p className="text-sm text-neutral-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {service.duration} minutes
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(service._id)}
                      className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
