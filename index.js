let createEmployeeRecords = function(arr){
    return arr.map(function(arr){
        return createEmployeeRecord(arr)
    })
}

let createEmployeeRecord = function(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [] 
    }
}

let createTimeInEvent = function(emp, time){
    let dateTime = time.split(" ")
    emp.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateTime[1], 10),
        date: dateTime[0]
    })
    return emp
}

let createTimeOutEvent = function(emp, time){
    let dateTime = time.split(" ")
    emp.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateTime[1], 10),
        date: dateTime[0]
    })
    return emp
}

let hoursWorkedOnDate = function(emp, date){
    let timeIn = emp.timeInEvents.find(function(e){
        return e.date === date
    })
    let timeOut = emp.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (timeOut.hour - timeIn.hour) /100
}

let wagesEarnedOnDate = function(emp,date){
    let pay = hoursWorkedOnDate(emp, date) * emp.payPerHour
    return pay
}

let allWagesFor = function(emp){
    let dates = emp.timeInEvents.map(function(e){
        return e.date
    })

    let allWages = dates.reduce(function(memo, e){
        return memo + wagesEarnedOnDate(emp, e)
    }, 0)

    return allWages
}

let findEmployeeByFirstName = function(arr, name){
    return arr.find(function(e){
       return e.firstName == name
    })
}

let calculatePayroll = function(arr){
    return arr.reduce(function(memo, e){
        return memo + allWagesFor(e)
    }, 0)
}