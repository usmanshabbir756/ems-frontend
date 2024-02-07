import React , {useState , useEffect} from 'react'
import { listEmployees } from '../services/ListEmployeesService';

const ListEmployeesComponent = () => {

    const [employees,setEpmloyees] = useState([]);

    useEffect(()=>{
        listEmployees().then((response)=> setEpmloyees(response.data)).catch(error=>console.error(error));
    },[])

  return (
    <div className='container'>
        <h2 className='text-center mt-3'>List Of Employees</h2>
        <table className='table table-striped table-bordered text-start'>
            <thead>
                <tr>
                    <th>Employee ID</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email ID</th>
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
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeesComponent