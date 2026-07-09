import Property from '../models/property.model.js';
import { uploadHandler } from '../utils/upload.service.js'; // Imported your Cloudinary service

// @desc    Get all properties (Public)
// @route   GET /properties
export const getProperties = async (req, res) => {
  try {
    const queryObject = {};

    if (req.query.status) {
      queryObject.status = req.query.status;
    } else {
      queryObject.status = 'Available'; 
    }

    if (req.query.propertyType) queryObject.propertyType = req.query.propertyType;
    if (req.query.bedrooms) queryObject.bedrooms = Number(req.query.bedrooms);
    
    const properties = await Property.find(queryObject)
      .populate('agentId', 'name email phone') 
      .sort('-createdAt'); 

    res.status(200).json({
      status: 'success',
      results: properties.length,
      data: properties,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single property (Public)
// @route   GET /properties/:id
export const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('agentId', 'name phone');

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    res.status(200).json({
      status: 'success',
      data: property,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a new property listing (Private - Agent/Admin only)
// @route   POST /properties
export const createProperty = async (req, res) => {
  try {
    const propertyData = {
      ...req.body,
      agentId: req.user._id,
    };

    // Handle Image Uploads concurrently
    if (req.files && req.files.images) {
      const imagePromises = req.files.images.map((file) => uploadHandler(file.path));
      const imageUrls = await Promise.all(imagePromises);
      propertyData.images = imageUrls.filter((url) => url !== null);
    }

    // Handle Document Uploads concurrently
    if (req.files && req.files.documents) {
      const documentPromises = req.files.documents.map((file) => uploadHandler(file.path));
      const documentUrls = await Promise.all(documentPromises);
      propertyData.documents = documentUrls.filter((url) => url !== null);
    }

    const property = await Property.create(propertyData);

    res.status(201).json({
      status: 'success',
      data: property,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};