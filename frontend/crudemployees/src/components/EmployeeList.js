import { useState, useContext } from "react";
import { AppContext } from "../Context";

const EmployeeList = () => {
    const {
        employees,
        employeeLenght,
        editMode,
        cancelEdit,
        updateEmployee,
        deleteEmployee,
    } = useContext(AppContext);

    const [newData, setNewData] = useState({});

    const saveBtn = () => {
        updateEmployee(newData);
    };

    const updateNewData = (e, field) => {
        setNewData({
            ...newData,
            [field]: e.target.value,
        });
    };

    const enableEdit = (id, employee_name, employee_email, employee_age, employee_designation, employee_created) => {
        setNewData({ id, employee_name, employee_email, employee_age, employee_designation, employee_created});
        editMode(id);
    };

    const deleteConfirm = (id) => {
        if (window.confirm("Are you sure?")) {
            deleteEmployee(id);
        }
    };

    return !employeeLenght ? (
        <p>{employeeLenght === null ? "Loading..." : "Please insert some users."}</p>
    ) : (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Designation</th>
                    <th>Created</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {employees.map(({ id, employee_name, employee_email, employee_age, 
                    employee_designation, employee_created, isEditing}) => {
                        return isEditing === true ? (
                            <tr key={id}>
                                <td>
                                 <input 
                                    type="text"
                                    defaultValue={employee_name}
                                    oncChange={(e) => updateNewData(e, "employee_name")}
                                 />
                                </td>
                                <td>
                                 <input 
                                    type="email"
                                    defaultValue={employee_email}
                                    oncChange={(e) => updateNewData(e, "employee_email")}
                                 />
                                </td>
                                <td>
                                 <input 
                                    type="text"
                                    defaultValue={employee_age}
                                    oncChange={(e) => updateNewData(e, "employee_age")}
                                 />
                                </td>
                                <td>
                                 <input 
                                    type="text"
                                    defaultValue={employee_designation}
                                    oncChange={(e) => updateNewData(e, "employee_designation")}
                                 />
                                </td>
                                <td>
                                 <input 
                                    type="text"
                                    defaultValue={employee_created}
                                    oncChange={(e) => updateNewData(e, "employee_created")}
                                 />
                                </td>
                                <td>
                                    <button className="btn green-btn" onClick={() => saveBtn()}>Save</button>
                                    <button className="btn default-btn" onClick={() => cancelEdit(id)}>Cancel</button>
                                </td>
                            </tr>
                        ) : (
                            <tr key="{id}">
                                <td>{employee_name}</td>
                                <td>{employee_email}</td>
                                <td>{employee_age}</td>
                                <td>{employee_designation}</td>
                                <td>{employee_created}</td>
                                <td>
                                    <button className="btn default-btn"
                                     onClick={() => enableEdit(id, employee_name, employee_email, employee_age, 
                                        employee_designation, employee_created)}>
                                        Edit
                                    </button>
                                    <button className="btn red-btn"
                                    onClick={() => deleteConfirm(id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );                     
                    })}
            </tbody>
        </table>
    );
};

export default EmployeeList;