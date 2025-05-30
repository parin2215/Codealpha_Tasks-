const Project = require('../models/Project');
const User = require('../models/User'); // Import User model

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ createdBy: req.user._id })
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ message: 'Error fetching projects' });
  }
};

// Get a single project
exports.getProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    }).populate('createdBy', 'name email');

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ message: 'Error fetching project' });
  }
};

// Create a new project
exports.createProject = async (req, res) => {
  try {
    const { title, description, startDate, endDate, isPublic, tags, teamMembersByEmail } = req.body; // Get emails

    const project = new Project({
      title,
      description,
      startDate,
      endDate,
      isPublic,
      tags,
      createdBy: req.user._id
    });

    // Add creator to the team
    project.team.push({
      user: req.user._id,
      role: 'admin'
    });

    // Find users by email and add to team
    if (teamMembersByEmail && teamMembersByEmail.length > 0) {
      const users = await User.find({ email: { $in: teamMembersByEmail } });
      users.forEach(user => {
        // Avoid adding the creator again if their email was included
        if (user._id.toString() !== req.user._id.toString()) {
          // Check if user is already in the team (prevents duplicates)
          const existingMember = project.team.find(member => member.user.toString() === user._id.toString());
          if (!existingMember) {
            project.team.push({
              user: user._id,
              role: 'member' // Default role
            });
          }
        }
      });
    }

    const savedProject = await project.save();
    const populatedProject = await Project.findById(savedProject._id)
      .populate('createdBy', 'name email')
      .populate('team.user', 'name email'); // Populate team members
    
    res.status(201).json(populatedProject);
  } catch (error) {
    console.error('Error creating project:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error creating project' });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Handle updating team members if needed (more complex, will add later)
    const { team, ...updateData } = req.body;

    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: updateData }, // Only update fields other than team for now
      { new: true, runValidators: true }
    ).populate('createdBy', 'name email')
     .populate('team.user', 'name email'); // Populate team members

    res.json(updatedProject);
  } catch (error) {
    console.error('Error updating project:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: 'Error updating project' });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findOne({
      _id: req.params.id,
      createdBy: req.user._id
    });

    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    await project.deleteOne();
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ message: 'Error deleting project' });
  }
}; 