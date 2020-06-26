// Your code here
let createEmployeeRecord = function(array){
    return {firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

let createEmployeeRecords = function(arrays) {
    return arrays.map(function(array) {
        return createEmployeeRecord(array);
    });
};

let createTimeInEvent = function(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });
    return employeeRecord
};
let createTimeOutEvent = function(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employeeRecord
};

let hoursWorkedOnDate = function(employeeRecord, date) {
    let eventIn = employeeRecord.timeInEvents.find(function(event) {
        return event.date === date
    });
    let eventOut = employeeRecord.timeOutEvents.find(function(event) {
        return event.date === date
    });
    return (eventOut.hour - eventIn.hour) / 100
};

let wagesEarnedOnDate = function(employeeRecord, date) {
    let wage = hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
    return wage
};

let allWagesFor = function(employeeRecord) {
    let availableDate = employeeRecord.timeInEvents.map(function(event) {
        return event.date
    });

    let payableDate = availableDate.reduce(function(memo, date) {
        return memo + wagesEarnedOnDate(employeeRecord, date)
    }, 0);
    return payableDate
};

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(employeeRecord) {
        return employeeRecord.firstName === firstName
    });
};

let calculatePayroll = function(employeeRecords) {
    return employeeRecords.reduce(function(memo, record) {
        return memo + allWagesFor(record)
    }, 0);
};