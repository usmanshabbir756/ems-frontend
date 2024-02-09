import './App.css'
import DepartmentComponent from './components/DepartmentComponent'
import EmployeeComponent from './components/EmployeeComponent'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListDepartmentComponent from './components/ListDepartmentComponent'
import ListEmployeesComponent from './components/ListEmployeesComponent'
import { BrowserRouter , Routes,Route } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        {/* // http:localhost:3000 */}
        <Route path='/' element={<ListEmployeesComponent/>}></Route>
        {/* // http:localhost:3000/employees */}
        <Route path='/employees' element={<ListEmployeesComponent/>}></Route>
        {/* // http:localhost:3000/add-emplyee */}
        <Route path='/add-employee' element={<EmployeeComponent/>}></Route>
        {/* // http:localhost:3000/edit-emplyee/1 */}
        <Route path='/edit-employee/:id' element={<EmployeeComponent/>}></Route>
        {/* // http:localhost:3000/edit-emplyee/1 */}
        <Route path='/departments' element={<ListDepartmentComponent/>}></Route>
        {/* // http:localhost:3000/add-department */}
        <Route path='/add-department' element={<DepartmentComponent/>}></Route>
      </Routes>
      <FooterComponent />
      </BrowserRouter>
    </>
  )
}

export default App
