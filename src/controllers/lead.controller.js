import Lead from '../models/lead.model.js';
import Property from '../models/property.model.js';

// @desc    Create a new lead (Public)
// @route   POST /leads
export const createLead = async (req, res) => {
  try {
    const { buyerName, buyerEmail, buyerPhone, propertyId, budget, source } = req.body;

    // Verify if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    const lead = await Lead.create({
      buyerName,
      buyerEmail,
      buyerPhone,
      propertyId,
      agentId: property.agentId,
      status: 'New',
      budget,
      source: source || 'Website',
    });

    res.status(201).json({
      status: 'success',
      data: lead,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all leads for logged-in agent (Private - Agent/Admin)
// @route   GET /leads
export const getLeads = async (req, res) => {
  try {
    const query = {};
    if (req.user.role === 'agent') {
      query.agentId = req.user._id;
    }

    if (req.query.status) {
      query.status = req.query.status;
    }

    const leads = await Lead.find(query)
      .populate('propertyId')
      .populate('agentId', 'name email phone')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: leads.length,
      data: leads,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lead status (Private - Agent/Admin)
// @route   PATCH /leads/:id/status
export const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const query = { _id: req.params.id };

    if (req.user.role === 'agent') {
      query.agentId = req.user._id;
    }

    const lead = await Lead.findOneAndUpdate(
      query,
      { status },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found or not authorized' });
    }

    res.status(200).json({
      status: 'success',
      data: lead,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update lead details (Private - Agent/Admin)
// @route   PATCH /leads/:id
export const updateLead = async (req, res) => {
  try {
    const { notes, budget, nextFollowUp } = req.body;
    const query = { _id: req.params.id };

    if (req.user.role === 'agent') {
      query.agentId = req.user._id;
    }

    const updateData = {};
    if (notes !== undefined) updateData.notes = notes;
    if (budget !== undefined) updateData.budget = budget;
    if (nextFollowUp !== undefined) updateData.nextFollowUp = nextFollowUp;

    const lead = await Lead.findOneAndUpdate(
      query,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!lead) {
      return res.status(404).json({ message: 'Lead not found or not authorized' });
    }

    res.status(200).json({
      status: 'success',
      data: lead,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
