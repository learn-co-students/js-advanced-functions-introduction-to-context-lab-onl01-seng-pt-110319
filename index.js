// Your code here
function createEmployeeRecord(testEmployee) {
    return {
        firstName: testEmployee[0],
        familyName: testEmployee[1],
        title: testEmployee[2],
        payPerHour: testEmployee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrOfArrays) {
    let newArr = arrOfArrays.map(arr => {
        return createEmployeeRecord(arr)
    })
    return newArr;
}

function createTimeInEvent(record, dateTime) {
    record.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateTime.slice(11), 10),
        date: dateTime.slice(0, 10)
    });
    return record
}

function createTimeOutEvent(record, dateTime) {
    record.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTime.slice(11), 10),
        date: dateTime.slice(0, 10)
    });
    return record
}

function hoursWorkedOnDate(record, dateTime) {
    let timeIn = record.timeInEvents.find(e => e.date === dateTime);
    let timeOut = record.timeOutEvents.find(e => e.date === dateTime);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(record, dateTime) {
    let hours = hoursWorkedOnDate(record, dateTime);
    let wages = record.payPerHour;
    let dayPay = hours * wages;

    return dayPay;
}

function allWagesFor(record) {
    let dates = record.timeInEvents.map(timeIn => {
        return timeIn.date;
    })
    let totalPay = dates.reduce(function(total, date) {
        return total + wagesEarnedOnDate(record, date)
    }, 0)
    return totalPay;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(empObj => {
        return empObj.firstName === firstName;
    })
}

function calculatePayroll(recordsArray) {
    return recordsArray.reduce(function(compTotal, empTotal) {
        return compTotal + allWagesFor(empTotal);
    }, 0)

}