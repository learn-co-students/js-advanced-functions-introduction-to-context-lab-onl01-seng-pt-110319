function createEmployeeRecord(answer) {
    return {
        firstName: answer[0],
        familyName: answer[1],
        title: answer[2],
        payPerHour: answer[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(answer) {
    const map1 = answer.map(x => createEmployeeRecord(x));
    return map1
}

function createTimeInEvent(employee, date) {
    let [day, hour] = date.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: day,
    })
    return employee
}

function createTimeOutEvent(employee, date) {
    let [day, hour] = date.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: day,
    })
    return employee
}

function hoursWorkedOnDate(employee, day) {
    let i = employee.timeInEvents.find(function(x){
        return x.date === day
    })

    let b = employee.timeOutEvents.find(function(x){
        return x.date === day
    })

    const answer = (b.hour - i.hour) / 100
    return answer

}

function wagesEarnedOnDate(employee, day) {
    return parseInt((hoursWorkedOnDate(employee, day) * employee.payPerHour), 10)
}

function allWagesFor(employee) {
    let total = 0;
    employee.timeInEvents.forEach( x => total = total + wagesEarnedOnDate(employee, x.date));
    return total
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor(rec)
      }, 0)
  }