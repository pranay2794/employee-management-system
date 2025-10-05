const asyncHandler=require('express-async-handler');
const Employee=require('../model/employeeModel');


//get all employees
const getEmployees=asyncHandler(async (req,res)=>{
    const employees=await Employee.find({managerId:req.manager.id});
    res.status(200).json(employees);
});

//create employee
const createEmployee=asyncHandler(async (req,res)=>{
    const {name,email,position,department,salary}=req.body;
    if(!name || !email || !position || !department || !salary){
        res.status(400);
        throw new Error('Please include all fields');
    }
    // Check if employee with the same email already exists
    const employeeExists = await Employee.findOne({ email });
    if (employeeExists) {
        res.status(400);
        throw new Error('Employee with this email already exists');
    }
    const employee=await Employee.create({name,email,position,department,salary,managerId:req.manager.id});
    res.status(201).json(employee);
});

//get employee by id
const getEmployeeById=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    const employee=await Employee.findById({_id:id,managerId:req.manager.id});
    if(!employee){
        res.status(404);
        throw new Error('Employee not found');
    }
    res.status(200).json(employee);
});


//update employee
const updateEmployee=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    const employee=await Employee.findByIdAndUpdate({_id:id,managerId:req.manager.id},req.body,{new:true, runValidators:true});
    if(!employee){
        res.status(404);
        throw new Error('Employee not found');
    }
    res.status(200).json(employee);
});

//delete employee
const deleteEmployee=asyncHandler(async (req,res)=>{
    const {id}=req.params;
    const employee=await Employee.findByIdAndDelete({_id:id,managerId:req.manager.id});
    if(!employee){
        res.status(404);
        throw new Error('Employee not found');
    }
    res.status(200).json({message: 'Employee deleted successfully'});
});

module.exports={createEmployee,getEmployeeById,getEmployees,updateEmployee,deleteEmployee};