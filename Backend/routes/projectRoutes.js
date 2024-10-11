// projectRoutes.js
const express = require('express');
const multer = require('multer');
const { protect } = require('../middlewares/authMiddleware');
const { getAllProjects, createProject, updateProject, deleteProject, exportProjects, importProjects } = require('../controllers/projectController');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.route('/').get(protect, getAllProjects).post(protect, createProject);
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject);
router.get('/export/csv', protect, exportProjects);
router.post('/import/csv', protect, upload.single('file'), importProjects);

module.exports = router;
