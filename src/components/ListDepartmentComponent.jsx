import React, { useEffect, useState } from 'react'
import { getAllDepartment } from '../services/DepartmmentService';
import { Link } from 'react-router-dom';

const ListDepartmentComponent = () => {

    const [departments,setDepartments] = useState([]);

    useEffect(()=>{
        getAllDepartment().then(response=>{
            setDepartments(response.data)
        }).catch(error=>console.log(error))
    },[]);

  return (
    <div className='container'>
        <h2 className='text-center mt-3'>List Of Department</h2>
        <Link to="/add-department" className='btn btn-primary mb-2'>Department</Link>
        <table className='table table-striped table-bordered text-start'>
            <thead>
                <tr>
                    <th>Department ID</th>
                    <th>Department Name</th>
                    <th>Department Description</th>
                </tr>
            </thead>
            <tbody>
                {
                    departments.map((department)=>
                        <tr key={department.id}>
                            <td>{department.id}</td>
                            <td>{department.departmentName}</td>
                            <td>{department.departmentDescription}</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListDepartmentComponent