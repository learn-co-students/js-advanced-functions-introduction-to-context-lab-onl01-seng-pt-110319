// Your code here
function createEmployeeRecord (employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employees) {
    return employees.map(employee => createEmployeeRecord(employee));
}

function createTimeInEvent (employee, date) {
    const dateTime = date.split(' ');
    employee.timeInEvents.push({ type: "TimeIn", hour: parseInt(dateTime[1], 10), date: dateTime[0] });
    return employee;
}

function createTimeOutEvent (employee, date) {
    const dateTime = date.split(' ');
    employee.timeOutEvents.push({ type: "TimeOut", hour: parseInt(dateTime[1], 10), date: dateTime[0] });
    return employee;
}

function hoursWorkedOnDate (employee, date) {
    const inEvent = employee.timeInEvents.find(timeIn => timeIn.date === date);
    const outEvent = employee.timeOutEvents.find(timeOut => timeOut.date === date);

    return (outEvent.hour - inEvent.hour) / 100;
}

function wagesEarnedOnDate (employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor (employee) {
    return employee.timeInEvents.reduce((totalWages, dateEvent) => totalWages += wagesEarnedOnDate(employee, dateEvent.date), 0);
}

function calculatePayroll(employees) {
    return employees.reduce((totalWages, employee) => totalWages += allWagesFor(employee), 0);
}

function findEmployeeByFirstName (employees, firstName) {
    return employees.find((employee) => employee.firstName === firstName)
}