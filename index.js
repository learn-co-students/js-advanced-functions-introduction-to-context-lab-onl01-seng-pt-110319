function createEmployeeRecord(empRec) {
    return {
        firstName: empRec[0],
        familyName: empRec[1],
        title: empRec[2],
        payPerHour: empRec[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrOfArrs) {
    let newArr = arrOfArrs.map(arr => {
        return createEmployeeRecord(arr);
    })
    return newArr;
}

function createTimeInEvent(emp, dateStamp) {
    
    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(11), 10),
        date: dateStamp.slice(0, 10)
    });
    return emp;
}

function createTimeOutEvent(emp, dateStamp) {
    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(11), 10),
        date: dateStamp.slice(0, 10)
    });
    return emp;
}

function hoursWorkedOnDate(emp, dateStamp) {
    let timeIn = emp.timeInEvents.find(e => e.date === dateStamp);
    let timeOut = emp.timeOutEvents.find(e => e.date === dateStamp);

    return (timeOut.hour - timeIn.hour) / 100;
}

function wagesEarnedOnDate(emp, dateStamp) {
    let hours = hoursWorkedOnDate(emp, dateStamp);
    let wage = emp.payPerHour;
    let dayPay = hours * wage;
    return dayPay;
}

function allWagesFor(emp) {
    let dates = emp.timeInEvents.map(timeIn => { 
        return timeIn.date;
    })
    let totalPay = dates.reduce(function(total, date) {
        return total + wagesEarnedOnDate(emp, date)
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
    // let total = [];
    // recordsArray.forEach(record => {
    //     total.push(allWagesFor(record));
    // })
    // let grandTotal = total.reduce(function(compTotal, empTotal){
    //     return compTotal + empTotal;
    // }, 0)
    // return grandTotal;
}