const Project = require('../models/projectModel');
const { exportProjectsToCSV, importProjectsFromCSV } = require('../services/csvService');

// Get all projects
const getAllProjects = async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
};

// Create new project
const createProject = async (req, res) => {
  const { name, description, status } = req.body;

  const project = new Project({ name, description, status });
  await project.save();

  res.status(201).json(project);
};

// Update existing project
const updateProject = async (req, res) => {
  const { name, description, status } = req.body;

  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }

  project.name = name || project.name;
  project.description = description || project.description;
  project.status = status || project.status;

  await project.save();
  res.json(project);
};

// Delete project
const deleteProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    res.status(404).json({ message: 'Project not found' });
    return;
  }

  await project.remove();
  res.json({ message: 'Project deleted' });
};

// Export projects to CSV
const exportProjects = async (req, res) => {
    try {
      const projects = await Project.find({});
      if (projects.length === 0) {
        return res.status(404).json({ message: 'No projects found.' });
      }
      const uniqueProjects = Array.from(new Map(projects.map(project => [project.name, project])).values());
  
      const json2csvParser = new Parser();
      const csv = json2csvParser.parse(uniqueProjects);
  
      res.header('Content-Type', 'text/csv');
      res.attachment('projects.csv');
      res.send(csv);
    } catch (error) {
      res.status(500).json({ message: 'Failed to export projects.', error: error.message });
    }
  };
  
  

// Import projects from CSV
const importProjects = (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          for (const project of results) {
            const existingProject = await Project.findOne({ name: project.name });
            if (!existingProject) {
              await Project.create(project);
            }
          }
          
          res.status(201).json({ message: 'Projects imported successfully.', count: results.length });
        } catch (error) {
          res.status(500).json({ message: 'Failed to import projects.', error: error.message });
        } finally {
          fs.unlinkSync(req.file.path);
        }
      });
  };
  
  

module.exports = { getAllProjects, createProject, updateProject, deleteProject, exportProjects, importProjects };
