// Your code here
function createEmployeeRecord(arr) {
    let obj = {}
    obj.firstName = arr[0]
    obj.familyName = arr[1]
    obj.title = arr[2]
    obj.payPerHour = arr[3]
    obj.timeInEvents = []
    obj.timeOutEvents = []
    return obj
}

function createEmployeeRecords(arr) {
    return arr.map(e => createEmployeeRecord(e))
}

function createTimeInEvent(record, date) {
    let day = date.split(" ")[0]
    let time = date.split(" ")[1]
    let timeRecord = {
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: day
    }
 record.timeInEvents.push(timeRecord)
 return record
}

function createTimeOutEvent(record, date) {
    let day = date.split(" ")[0]
    let time = date.split(" ")[1]
    let timeRecord = {
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: day
    }
    record.timeOutEvents.push(timeRecord)
    return record
}

function hoursWorkedOnDate(record, date) {
    let timeIn = record.timeInEvents.find(f => f.date === date)
    let timeOut = record.timeOutEvents.find(f => f.date === date)
    return (timeOut.hour - timeIn.hour)/100

}

function wagesEarnedOnDate(record, date) {
    let hours = hoursWorkedOnDate(record, date)
    return hours * record.payPerHour

}

function allWagesFor(record) {
    let datesArr = record.timeInEvents.map(time => time.date)
    let total = 0;
    datesArr.forEach(date => {
        total =  total + wagesEarnedOnDate(record, date)
    })
    return total
}

function calculatePayroll(employees) {
    return employees.reduce((total, e) => total + allWagesFor(e), 0);

}

function findEmployeeByFirstName(srcArray, firstName) {
    let name = srcArray.filter(s => s.firstName === firstName)
    console.log("name", name)
    return name[0]
}
