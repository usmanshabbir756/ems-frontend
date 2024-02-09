import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeesService';
import { useNavigate , useParams } from 'react-router-dom';
import { getAllDepartment } from '../services/DepartmmentService';

const EmployeeComponent = () => {
    const [firstName,setFirstName]=useState('');
    const [lastName,setLastName]=useState('');
    const [email,setEmail]=useState('');
    const [departmentId,setDepartmmentId]=useState('');
    const [departments,setDepartmments]=useState([]);


    const[error,setError]=useState({
        firstName:"",
        lastName:"",
        email:"",
        department:""
    });

    const {id} = useParams();

    const navigator=useNavigate();

    useEffect(()=>{
        if(id){
            getEmployee(id).then((response)=>{
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setDepartmmentId(response.data.departmentId)
            }).catch((error)=>{
                console.error(error);
            })
        }
    },[id]);

    useEffect(()=>{
        getAllDepartment().then(response=>{
            setDepartmments(response.data)
        }).catch(error=>console.log(error));
    },[])

    function saveOrUpdateEmployee(e){
        e.preventDefault();
        if(handelValdation()){
        const employee={firstName,lastName,email,departmentId};
        console.log(employee);

        if(id){
            updateEmployee(id,employee).then(response=>{
                console.log(response.data)
            }).catch(error=>console.error(error));
        }
        else{
            createEmployee(employee).then((response)=>{
                console.log(response.data);
            });
        }
        navigator('/employees');
        }
    }

    function handelValdation(){
        let valid=true;
        const errorCopy={... error};
        if(firstName.trim()){
            errorCopy.firstName="";
        }
        else{
            errorCopy.firstName="First Name Not Invalid";
            valid=false;
        }
        if(lastName.trim()){
            errorCopy.lastName="";
        }
        else{
            errorCopy.lastName="Last Name  Not Invalid";
            valid=false;
        }
        if(email.trim()){
            errorCopy.email="";
        }
        else{
            errorCopy.email="Email Not Invalid";
            valid=false;
        }
        if(departmentId.trim()){
            errorCopy.department="";
        }
        else{
            errorCopy.department="Department Not Invalid";
            valid=false;
        }
        setError(errorCopy);
        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }
        else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

  return (
    <div className='container mb-5'>
        <br/><br/>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
            {pageTitle()}
                <div className='card-body mb-2'>
                    <form>
                        <div className='form-group'>
                            <label className='form-label'>First Name:</label>
                            <input 
                                type='text'
                                placeholder='Enter First Name'
                                value={firstName}
                                name='firstName'
                                className={`form-control ${ error.firstName ? "is-invalid" : "" }`}
                                onChange={(e)=>setFirstName(e.target.value)}
                            ></input>
                            { error.firstName && <div className='invalid-feedback'>{error.firstName}</div> }
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Last Name:</label>
                            <input 
                                type='text'
                                placeholder='Enter Last Name'
                                value={lastName}
                                name='lastName'
                                className={`form-control ${ error.lastName ? "is-invalid" : "" }`}
                                onChange={(e)=>setLastName(e.target.value)}
                            ></input>
                            { error.lastName && <div className='invalid-feedback'>{error.lastName}</div> }
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Email:</label>
                            <input 
                                type='email'
                                placeholder='Enter Email'
                                value={email}
                                name='email'
                                className={`form-control ${ error.email ? "is-invalid" : "" }`}
                                onChange={(e)=>setEmail(e.target.value)}
                            ></input>
                            { error.email && <div className='invalid-feedback'>{error.email}</div> }
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Select Department:</label>
                            <select
                                className={`form-control ${ error.department ? "is-invalid" : "" }`}
                                value={departmentId}
                                name='departmentId'
                                onChange={e=>setDepartmmentId(e.target.value)}
                            >
                                <option value={"select department"}>Select Department</option>
                                {
                                    departments.map(d=>
                                        <option key={d.id} value={d.id}>{d.departmentName}</option>
                                    )
                                }
                            </select>
                            { error.department && <div className='invalid-feedback'>{error.department}</div> }
                        </div>
                        <button className='btn btn-success m-2' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>

                </div>

            </div>

        </div>

    </div>
  )
}

export default EmployeeComponent