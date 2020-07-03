// Your code here
function createEmployeeRecord(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour : employee[3],
        timeInEvents: [],
        timeOutEvents: []
    };

}
function createEmployeeRecords(employees){
    return employees.map(createEmployeeRecord)
}
function createTimeInEvent(employee, punchIn){
    let [date, hour] = punchIn.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    })
    return employee
}
function createTimeOutEvent(employee, punchOut){
    let [date, hour] = punchOut.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    })
    return employee
}


function hoursWorkedOnDate(employee, date){
    let punchIn = employee.timeInEvents.find((e) => {return e.date === date})
    let punchOut = employee.timeOutEvents.find((e) => {return e.date === date})
    return (punchOut.hour - punchIn.hour) / 100  
}

function wagesEarnedOnDate(employee, date){
    let hours = hoursWorkedOnDate(employee, date)
    return parseInt(hours) * parseInt(employee.payPerHour)
}

function allWagesFor(employee){
    let workDays = employee.timeInEvents.map((e) => {return (e.date)})
    let payOut = workDays.reduce((acc, date) => {return acc + wagesEarnedOnDate(employee, date);}, 0)
        return payOut
}
function calculatePayroll(employees){
    return employees.reduce((acc, date)=>{ return acc + allWagesFor(date)}, 0)
}
function findEmployeeByFirstName(employees, info){
    return employees.find((employee)=> {return employee.firstName === info})
}