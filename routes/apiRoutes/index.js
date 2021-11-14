const express = require('express');
const router = express.Router();

router.use(require('./employeesRoutes'));
router.use(require('./rolesRoutes'));
router.use(require('./departmentRoutes.js'));

module.exports = router;