import Service from "../models/services.model.js";

export const createService = async (req, res) => {
  try {
    const { name, duration } = req.body;

    if (!name || !duration) {
      return res
        .status(400)
        .json({ message: "Name and duration are required" });
    }

    if (parseInt(duration) <= 0) {
      return res.status(400).json({ message: "Duration must be a positive number" });
    }

    const newService = await Service.create({ name, duration });

    return res.status(201).json(newService);
  } catch (error) {
    return res.status(500).json({ message: "Failed to create service" });
  }
};

export const getServices = async (req, res) => {
  try {
    const services = await Service.find();
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch services" });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedService = await Service.findByIdAndDelete(id);

    if (!deletedService) {
      return res.status(404).json({ message: "Service not found" });
    }

    return res.status(200).json({ message: "Service deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to delete service" });
  }
};
