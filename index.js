// Your code here
// [ 'Gray', 'Worm', 'Security', 1 ] = our array

function createEmployeeRecord(record) {

    return {
        firstName: record[0],
        familyName: record[1],
        title: record[2],
        payPerHour: record[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
function createEmployeeRecords(array) {
    let recordOne = []
    
    let result = array.map(nameInfo => {
        recordOne.push(createEmployeeRecord(nameInfo))
    })
    return recordOne
}

function createTimeInEvent(record, date) {
    let day = date.slice(0, 10)

    let hour = parseInt(date.slice(11), 10)

    record.timeInEvents.push({
        type: "TimeIn",
        date: day,
        hour: hour

    })
    return record
}

function createTimeOutEvent(record, date) {

    let day = date.slice(0, 10)
    let hour = parseInt(date.slice(11), 10)


    record.timeOutEvents.push({
        type: "TimeOut",
        date: day,
        hour: hour
    })
    return record
}

function hoursWorkedOnDate(record, date) {

    let timeIn = record.timeInEvents.find(element => element.date === date)
    
    let time = record.timeOutEvents.find(element => element.date === date)
    
    let result = (time.hour - timeIn.hour) / 100

    return result
}

// multiply the pay per hour by hours worked
function wagesEarnedOnDate(record, date) {

    let func = hoursWorkedOnDate(record, date)

    let pay = record.payPerHour

    let result = func * pay 
    return result
}
// reduce // total 378
function allWagesFor(record) {


    let dates = record.timeInEvents.map(day => day.date)
     
    let total = dates.reduce(function(accumlator, date) {
        return accumlator + wagesEarnedOnDate(record, date)
        console.log(accumlator)
        console.log(date)
    }, 0)
    return total
}

function calculatePayroll(array) {
    let total = array.reduce(function(accum, record ) {
        return accum + allWagesFor(record)
    }, 0)

    return total
}

function findEmployeeByFirstName(array, name) {

    let result = array.find(firstName => firstName.familyName)
    return result
}