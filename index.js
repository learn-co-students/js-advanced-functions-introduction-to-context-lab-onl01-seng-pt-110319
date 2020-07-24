// Your code here

function createEmployeeRecord(record) {
  let testEmployee={}
  testEmployee.firstName = record[0];
  testEmployee.familyName = record[1];
  testEmployee.title = record[2];
  testEmployee.payPerHour = record[3];
  testEmployee.timeInEvents = [];
  testEmployee.timeOutEvents = [];
  return testEmployee;
};

function createEmployeeRecords(array) {
  let employeeRecords = array.map(employee=>createEmployeeRecord(employee));
  return employeeRecords;
};

function createTimeInEvent(employee,startTime) {
  employee.timeInEvents.push({
    type:'TimeIn',
    hour: parseInt(startTime.split(" ")[1],10),
    date: startTime.split(" ")[0]});
    return employee;
};

function createTimeOutEvent(employee,endTime) {
  employee.timeOutEvents.push({
    type:'TimeOut',
    hour: parseInt(endTime.split(" ")[1],10),
    date: endTime.split(" ")[0]});
    return employee;
};

function hoursWorkedOnDate(employee,date) {
  let start = employee.timeInEvents.find(day=>day.date===date);
  let end =  employee.timeOutEvents.find(day=>day.date===date);
  return (end.hour-start.hour)/100;
};

function wagesEarnedOnDate(employee,date) {
  return hoursWorkedOnDate(employee,date)*employee.payPerHour;
};

function allWagesFor(employee) {
  let allDays= employee.timeInEvents.map(day=>day.date);
  let eachDayEarning=allDays.map(day=>hoursWorkedOnDate(employee,day));
  let total = eachDayEarning.reduce(function(total,amount) {
    return total+amount;
  });
  return total*employee.payPerHour;
};

function findEmployeeByFirstName(source,firstName) {
  return source.find(employee=>employee.firstName===firstName)
};

function calculatePayroll(source) {
  let eachEmployeeEarnings = source.map(employee=>allWagesFor(employee))
  let total = eachEmployeeEarnings.reduce(function(total,amount) {
    return total+amount;
  });
  return total;
};
