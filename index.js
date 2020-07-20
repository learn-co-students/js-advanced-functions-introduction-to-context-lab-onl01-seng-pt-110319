// Your code here


const createEmployeeRecord=function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }

}

const createEmployeeRecords=function(employees){
    return employees.map(function(x){
        return createEmployeeRecord(x);
    })
};

function formatDate(getType,dateStamp){
    const dateSplit=dateStamp.split(" ")
    return {type: getType, date: dateSplit[0], hour: parseInt(dateSplit[1],10)}
}

const createTimeInEvent=function(employee,date){
    employee.timeInEvents.push(formatDate("TimeIn",date))
    return employee
}
const createTimeOutEvent=function(employee,date){
    employee.timeOutEvents.push(formatDate("TimeOut",date))
    return employee
}

const hoursWorkedOnDate=function(employee,day){
    const timeIn=employee.timeInEvents.find((e)=>e.date===day).hour;
    const timeOut=employee.timeOutEvents.find((e)=>e.date===day).hour;
    return (timeOut-timeIn)/100;
}

const wagesEarnedOnDate=function(employee,day){
    return hoursWorkedOnDate(employee,day)*employee.payPerHour
}

const allWagesFor=function(employee){
    const array=employee.timeInEvents.map((day)=>{return wagesEarnedOnDate(employee,day.date)})
    return array.reduce((accumulator,currentVlue)=>{return accumulator+=currentVlue});
}

const findEmployeeByFirstName=function(employees,name){
    return employees.find((e)=>e.firstName===name);
}

function calculatePayroll(records){
    const allPay = (records.map((empl) => {return allWagesFor(empl)}))
    return allPay.reduce((acc, cv) => acc + cv)
}






// const greyWorm=createEmployeeRecord(["Gray", "Worm", "Security", 1]);
// console.log(createTimeInEvent(greyWorm,"2014-02-28 0900"))
// console.log(createTimeOutEvent(greyWorm,"2014-02-28 1400"))
// console.log(b=hoursWorkedOnDate(greyWorm,"2014-02-28 1400"))



// let twoRows = [
//     ["moe", "sizlak", "barkeep", 2],
//     ["bartholomew", "simpson", "scamp", 3]
//   ]

//   console.log(createEmployeeRecords(twoRows));