import React, { useEffect, useState } from 'react'
import { createDepartment, getDepartmentById, updateDepartment } from '../services/DepartmmentService';
import { useNavigate, useParams } from 'react-router-dom';

const DepartmentComponent = () => {

    const [departmentName,setDepartmentName]=useState('');
    const [departmentDescription,setDepartmentDescription]=useState('');

    const[error,setError]=useState({
        departmentName:'',
        departmentDescription:''
    });

    const navigator=useNavigate();
    const {id}=useParams();

    useEffect(()=>{
        if(id){
            getDepartmentById(id).then(response=>{
                setDepartmentName(response.data.departmentName);
                setDepartmentDescription(response.data.departmentDescription)
            }).catch(error=>console.error(error));
        }
        
    },[id])



    function saveOrUpdateDepartment(e){
        e.preventDefault();
        if(handelValdation()){
        const department={departmentName,departmentDescription};
        console.log(department);
            if(id){
                updateDepartment(id,department).then(response=>{
                    console.log(response.data)
                }).catch(error=>console.log(error));
            }
            else{
                createDepartment(department).then((response)=>{
                    console.log(response.data)
                }).catch(error=>console.log(error));
            } 
            navigator("/departments");
        }
    }

    function handelValdation(){
        let valid=true;
        const errorCopy={... error};
        if(departmentName.trim()){
            errorCopy.departmentName="";
        }
        else{
            errorCopy.departmentName="Department Name is Not Invalid";
            valid=false;
        }
        if(departmentDescription.trim()){
            errorCopy.departmentDescription="";
        }
        else{
            errorCopy.departmentDescription="Department Description  Not Invalid";
            valid=false;
        }
        setError(errorCopy);
        console.log(errorCopy);
        return valid;
    }

  return (
    <div className='container mb-5'>
    <br/><br/>
    <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
        <h2 className='text-center'>ADD Department</h2>
            <div className='card-body mb-2'>
                <form>
                    <div className='form-group'>
                        <label className='form-label'>Department Name:</label>
                        <input 
                            type='text'
                            placeholder='Enter Department Name'
                            value={departmentName}
                            name='departmentName'
                            className={`form-control ${ error.departmentName ? "is-invalid" : "" }`}
                            onChange={(e)=>setDepartmentName(e.target.value)}
                        ></input>
                         { error.departmentName && <div className='invalid-feedback'>{error.departmentName}</div> }
                    </div>
                    <div className='form-group'>
                        <label className='form-label'>Department Description:</label>
                        <input 
                            type='text'
                            placeholder='Enter Department Description'
                            value={departmentDescription}
                            name='departmentDescription'
                            className={`form-control ${ error.departmentDescription? "is-invalid" : "" }`}
                            onChange={(e)=>setDepartmentDescription(e.target.value)}
                        ></input>
                         { error.departmentDescription && <div className='invalid-feedback'>{error.departmentDescription}</div> }
                    </div>
                    <button className='btn btn-success m-2' onClick={saveOrUpdateDepartment}>Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>
  )
}

export default DepartmentComponent