import {useEffect, useState} from "react";

export const Actions = () => {
    let [employees, setEmployees] = useState([]);

    let[empLength, setEmpLength] = useState(null);

    useEffect(() => {
        fetch("http://localhost:80/apiphp/api/read.php")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data.sucess){
                    setEmployees(data.employees.reverse());
                    setEmpLength(true);
                } else {
                    setEmpLength(0);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    //insert employees
    const insertEmployee = (newEmp) => {
        fetch("http://localhost:80/apiphp/api/create.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newEmp),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if(data.id){
                    setEmployees([
                        {
                            id: data.id,
                            ...newEmp,
                        },
                        ...employees,
                    ]);
                    setEmpLength(true);
                } else {
                    alert(data.msg);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //Enabling the edit mode for a listed user
    const editMode = (id) => {
        employees = employees.map((employee) => {
            if (employee.id === id) {
                employee.isEditing = true;
                return employee;
            }
                employee.isEditing = false;
                return employee;
        });
        setEmployees(employees);
    };

    //Cancel the edit mode
    const cancelEdit = (id) => {
        employees = employees.map((employee) => {
            if (employee.id === id){
                employee.isEditing = false;
                return employee;
            }
            return employee;
        });
        setEmployees(employees);
    }

    //Updating
    const updateEmployee = (employeeData) => {
        fetch("http://localhost:80/apiphp/api/update.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(employeeData),
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                if (data.success){
                    employees = employees.map((employee) => {
                        if (employee.id === employeeData.id) {
                            employee.isEditing = false;
                            employee.employee_name = employeeData.employee_name;
                            employee.employee_email = employeeData.employee_email;
                            employee.employee_age = employeeData.employee_age;
                            employee.employee_designation = employeeData.employee_designation;
                            employee.employee_created = employeeData.employee_created;
                            return employee;
                        }
                        return employee;;
                    });
                    setEmployees(employees);
                } else {
                    alert(data.msg);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    //Deleting a user
    const deleteEmployee = (theID) => {
      //filter
      let emplooyeerDeleted = employees.filter((employee) => {
          return employee.id !== theID;
      });
      fetch("http://localhost:80/apiphp/api/delete.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: theID }),
      })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data.success){
                setEmployees(emplooyeerDeleted);
                if(employees.length === 1){
                    setEmpLength(0);
                }
            } else {
                alert(data.msg);
            }
        })
        .catch((err) => {
            console.log(err);
          });
    };

    return {
        employees,
        editMode,
        cancelEdit,
        updateEmployee,
        insertEmployee,
        deleteEmployee,
        empLength,
    };

}