// Your code here
function createEmployeeRecord([firstName ="", familyName = "", title, payPerHour]) {
	let newEmployee = Object.create({
		firstName: firstName,
		familyName: familyName,
		title: title,
		payPerHour: payPerHour,
		timeInEvents: [],
		timeOutEvents: []
	})
	return newEmployee
};

function createEmployeeRecords(employees) {
	let employee = employees.map(function(e) {
		return createEmployeeRecord(e)
	})
	return employee
};

function createTimeInEvent(employee, date) {
	let splitDate = date.split(" ")
	let day = splitDate[0]
	let time = parseInt(splitDate[1],10)
	employee.timeInEvents.push(Object.assign({}, {type: "TimeIn", date: day, hour: time}))
	return employee
};

function createTimeOutEvent(employee, date) {
	let splitDate = date.split(" ")
	let day = splitDate[0]
	let time = parseInt(splitDate[1],10)
	employee.timeOutEvents.push(Object.assign({}, {type: "TimeOut", date: day, hour: time}))
	return employee
};

function hoursWorkedOnDate(employee, date) {
	let timeIn = employee.timeInEvents.find(function(e) {
		if (e.date === date) {
			return e
		}
	})
	let timeOut = employee.timeOutEvents.find(function(o) {
		if (o.date === date) {
			return o
		}
	})
	let hoursWorked = (timeOut.hour - timeIn.hour)/100
	return hoursWorked
};

function wagesEarnedOnDate(employee, date) {
	let hours = hoursWorkedOnDate(employee, date)
	let wages = hours * employee.payPerHour
	return wages
};

function allWagesFor(employee) {
	let days = employee.timeInEvents.map(function(e) {
		return e.date
	})
	let hours = days.map(function(e) {
		return hoursWorkedOnDate(employee, e)
	})
	let wages = hours.map(function(e) {
		return e*employee.payPerHour
	})
	let allWages = wages.reduce((a,b) => a+b, 0)
	return allWages
};

function findEmployeeByFirstName(employees, name) {
	let person = employees.find(function(e) {
		if (e.firstName === name) {
			return e
		}
	})
	return person
};

function calculatePayroll(employees) {
	let employeeWages = employees.map(function(e) {
		return allWagesFor(e)
	})
	let finalPayroll = employeeWages.reduce((a,b) => a+b, 0)
	return finalPayroll
}



