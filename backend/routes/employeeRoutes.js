const express = require('express');
const router=express.Router();
const {createEmployee,getEmployeeById,getEmployees,updateEmployee,deleteEmployee}=require('../controller/employeeController');
const validateTokenHandler=require('../middleware/validateTokenHandler');


// Protect all routes after this middleware
router.use(validateTokenHandler);

//create employee
router.post('/',createEmployee);

//get all employees
router.get('/',getEmployees);

//get employee by id
router.get('/:id',getEmployeeById);

//update employee
router.put('/:id',updateEmployee);

//delete employee
router.delete('/:id',deleteEmployee);

module.exports=router;