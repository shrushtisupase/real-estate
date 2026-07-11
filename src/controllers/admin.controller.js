import User from '../models/user.model.js';
import Lead from '../models/lead.model.js';

// @desc    Get all agents (Private - Admin only)
// @route   GET /admin/agents
export const getAgents = async (req, res) => {
  try {
    const agents = await User.find({ role: 'agent' })
      .select('-password')
      .sort('-createdAt');

    res.status(200).json({
      status: 'success',
      results: agents.length,
      data: agents,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Toggle agent verification (Private - Admin only)
// @route   PATCH /admin/agents/:id/verify
export const verifyAgent = async (req, res) => {
  try {
    const agent = await User.findOne({ _id: req.params.id, role: 'agent' });
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }

    agent.isVerified = !agent.isVerified;
    await agent.save();

    res.status(200).json({
      status: 'success',
      data: {
        _id: agent._id,
        name: agent.name,
        email: agent.email,
        role: agent.role,
        isVerified: agent.isVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get revenue analytics (Private - Admin only)
// @route   GET /admin/revenue
export const getRevenue = async (req, res) => {
  try {
    const revenueData = await Lead.aggregate([
      // Match only closed leads
      { $match: { status: 'Closed' } },
      
      // Look up associated property in properties collection
      {
        $lookup: {
          from: 'properties',
          localField: 'propertyId',
          foreignField: '_id',
          as: 'property',
        },
      },
      
      // Unwind property array
      { $unwind: '$property' },
      
      // Sum the price from property and count the closed leads
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$property.price' },
          totalClosedLeads: { $sum: 1 },
        },
      },
    ]);

    const result = revenueData[0] || { totalRevenue: 0, totalClosedLeads: 0 };

    res.status(200).json({
      status: 'success',
      data: {
        totalRevenue: result.totalRevenue,
        totalClosedLeads: result.totalClosedLeads,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
