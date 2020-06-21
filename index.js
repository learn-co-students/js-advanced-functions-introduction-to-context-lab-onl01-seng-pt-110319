// Your code here
 let createEmployeeRecord = function (array) {

    let employee = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
 }

 let createEmployeeRecords = function (arrayOfArrays) {
    //  console.log("firstIndex", createEmployeeRecord(arrayOfArrays[0]))
    let employeeRecords = []
    employeeRecords.push(createEmployeeRecord(arrayOfArrays[0]), createEmployeeRecord(arrayOfArrays[1]))
    return employeeRecords
 }

 let createTimeInEvent = function (employeeRecordObject, dateStamp) {   

    let employee = employeeRecordObject
    let date = dateStamp.split(' ')[0]
    let hour = dateStamp.split(' ')[1]

    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    })
    
    return employee
 }

 let createTimeOutEvent = function (employeeRecordObject, dateStamp) {   

    let employee = employeeRecordObject
    let date = dateStamp.split(' ')[0]
    let hour = dateStamp.split(' ')[1]

    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    })
    
    return employee
 }

 let hoursWorkedOnDate = function (employeeRecordObject, dateStamp) {

    // let totalHoursWorked 
    // let timeIn = employeeRecordObject.timeInEvents[0].hour
    // let timeOut = employeeRecordObject.timeOutEvents[0].hour
    // totalHoursWorked = (timeOut - timeIn)/100
    // return totalHoursWorked

    // console.log("employee", employeeRecordObject)
    // console.log("dateStamp", dateStamp)

    let totalHoursWorked

    let timeIn = employeeRecordObject.timeInEvents.find(e => e.date === dateStamp) 
    // console.log("timeIn", timeIn)

    let timeOut = employeeRecordObject.timeOutEvents.find(e => e.date === dateStamp) 
    // console.log("timeOut", timeOut)

    totalHoursWorked = (timeOut.hour - timeIn.hour) / 100
    return totalHoursWorked

 }

 let wagesEarnedOnDate = function (employeeRecordObject, dateStamp) {

    // let totalWagesEarned 
    // let timeIn = employeeRecordObject.timeInEvents[0].hour
    // let timeOut = employeeRecordObject.timeOutEvents[0].hour
    // totalWagesEarned = ((timeOut - timeIn) / 100) * employeeRecordObject.payPerHour
    // return totalWagesEarned

    let owedPay 

    owedPay = hoursWorkedOnDate(employeeRecordObject, dateStamp) * employeeRecordObject.payPerHour
    return owedPay
    
 }

 let allWagesFor = function (employeeRecordObject) {
    // console.log("employeeRecordObject", employeeRecordObject)

    // let payOwed
    // let employeeTimeIn = employeeRecordObject.timeInEvents[0].hour + employeeRecordObject.timeInEvents[1].hour
    // let employeeTimeOut = employeeRecordObject.timeOutEvents[0].hour + employeeRecordObject.timeOutEvents[1].hour
    // payOwed = ((employeeTimeOut - employeeTimeIn) / 100) * employeeRecordObject.payPerHour
    // return payOwed

    let payOwed 

    let dates = employeeRecordObject.timeInEvents.map(e => e.date)
    // console.log("dates", dates)
    payOwed = dates.reduce(function(accumulator, currentValue) {
        // console.log("accumulator", accumulator)
        // console.log("currentValue", currentValue)
        return accumulator + wagesEarnedOnDate(employeeRecordObject, currentValue)
    }, 0)
    return payOwed
 }

 let findEmployeeByFirstName = function (arrayOfEmployeeRecords, firstName) {
    return arrayOfEmployeeRecords.find(employee => {
        // console.log("employee", employee.firstName === firstName)
        return employee.firstName === firstName

    })
    // console.log("first namer", firstName)
 }

 let calculatePayroll = function (arrayOfEmployeeRecords) {

    let payOwed

    payOwed = arrayOfEmployeeRecords.reduce(function(accumulator, currentValue) {
        return accumulator + allWagesFor(currentValue)
    }, 0)
    return payOwed

 }
