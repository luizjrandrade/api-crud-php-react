import { useState, useContext } from "react";
import { AppContext } from "../Context";

const Form = () => {
    const { insertEmployee } = useContext(AppContext);
    const [newEmployee, setNewEmployee] = useState({});

    // Storing the Insert User Form Data
    const addNewEmployee = (e, field) => {
        setNewEmployee({
            ...newEmployee,
            [field]: e.target.value,
        });
    };

    //Inserting a new user into to Database
    const submitEmployee = (e) => {
        e.preventDefault();
        insertEmployee(newEmployee);
        e.target.reset();
    }

    return(
        <form className="insertForm" onSubmit={submitEmployee}>
            <h2>Insert Employeer</h2>
            <label htmlFor="_name">Name</label>
            <input 
                type="text"
                id="_name"
                onChange={(e) => addNewEmployee(e, "employee_name")}
                placaholder="Enter name"
                autoComplete="off"
                required
            />
            <label htmlFor="_email">E-mail</label>
            <input 
                type="text"
                id="_email"
                onChange={(e) => addNewEmployee(e, "employee_email")}
                placaholder="Enter e-mail"
                autoComplete="off"
                required
            />
            <label htmlFor="_age">Age</label>
            <input 
                type="text"
                id="_age"
                onChange={(e) => addNewEmployee(e, "employee_age")}
                placaholder="Enter age"
                autoComplete="off"
                required
            />
            <label htmlFor="_designation">Designation</label>
            <input 
                type="text"
                id="_designation"
                onChange={(e) => addNewEmployee(e, "employee_designation")}
                placaholder="Enter designation"
                autoComplete="off"
                required
            />
            <label htmlFor="_created">Created</label>
            <input 
                type="text"
                id="_created"
                onChange={(e) => addNewEmployee(e, "employee_created")}
                placaholder="Enter created"
                autoComplete="off"
                required
            />
            <input type="submit" value="Insert" />
        </form>
    );

};

export default Form;