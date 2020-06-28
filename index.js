const createEmployeeRecord = (testEmployee) => {
    return {
        firstName: testEmployee[0],
        familyName: testEmployee[1],
        title: testEmployee[2],
        payPerHour: testEmployee[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

const createEmployeeRecords = (employeeRecords) => {
    return employeeRecords.map(employee => {
        return (createEmployeeRecord(employee));
    })
}

const createTimeInEvent = (employee, dateStamp) => {
    const [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date
    })   
    return employee;
}

const createTimeOutEvent = (object, dateStamp) => {
    const [date, hour] = dateStamp.split(' ')
    object.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour)
    })
    return object;
}

const hoursWorkedOnDate = (employee, findDate) => {
    
    let inEvent = employee.timeInEvents.find((e) => {
        return e.date === findDate
    })
    
    let outEvent = employee.timeOutEvents.find((e) => {
        return e.date === findDate
    })

    return (outEvent.hour - inEvent.hour) / 100 ;   
}

const wagesEarnedOnDate = (employee, findDate) => {
    return hoursWorkedOnDate(employee, findDate) * employee.payPerHour;
}

const allWagesFor = (employee) => {
    let workDates = employee.timeInEvents.map((e) => {
        return (e.date)
    })

    let payOut = workDates.reduce((acc, currentValue) => {        
        return acc + wagesEarnedOnDate(employee, currentValue);
    }, 0)
        return payOut
}

const calculatePayroll = (employees) => {
    return employees.reduce((first, next) => {
        return(first + allWagesFor(next));   
    },0);
}

const findEmployeeByFirstName = (employees, firstName) => {
    return employees.find(e => {
        return e.firstName === firstName
    });
}


