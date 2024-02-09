import React , {useState , useEffect} from 'react'
import { deleteEmployee, listEmployees } from '../services/ListEmployeesService';
import { useNavigate } from 'react-router-dom';

const ListEmployeesComponent = () => {

    const [employees,setEpmloyees] = useState([]);
    const navigator=useNavigate();

    useEffect(()=>{
        listEmployees().then((response)=> setEpmloyees(response.data)).catch(error=>console.error(error));
    },[employees])

    function addEmployee(){
        navigator('/add-employee');
    }

    function handelUpdate(id){
        navigator(`/edit-employee/${id}`);
    }
    function handelDelete(id){
        deleteEmployee(id).then(response=>{}).catch(error=>console.error(error));
    }

  return (
    <div className='container'>
        <h2 className='text-center mt-3'>List Of Employees</h2>
        <button className='btn btn-primary mb-2' onClick={addEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered text-start'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email ID</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    employees.map((employee)=>
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.firstName}</td>
                            <td>{employee.lastName}</td>
                            <td>{employee.email}</td>
                            <td>
                                <button className='btn btn-info' onClick={()=> handelUpdate(employee.id)}>Update</button>
                                <button className='btn btn-danger' style={{marginLeft:"10px"}} onClick={()=> handelDelete(employee.id)}>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeesComponent