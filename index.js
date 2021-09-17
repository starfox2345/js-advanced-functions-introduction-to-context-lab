// Your code here
// 1) populates a firstName field from the 0th element
// 2) populates a familyName field from the 1th element
// 3) populates a title field from the 2th element
// 4) populates a payPerHour field from the 3th element
// 5) initializes a field, timeInEvents, to hold an empty Array
// 6) initializes a field, timeOutEvents, to hold an empty Array
function createEmployeeRecord(array) {
    const arr = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return arr
}



function createEmployeeRecords(array) {
    return array.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(event, datestamp){
    const [fullDate, hour] = datestamp.split(" ");

    event.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: fullDate
    })
    return event
}

function createTimeOutEvent(event, datestamp){
    const [fullDate, hour] = datestamp.split(" ");

    event.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: fullDate
    })
    return event
}

// describe("hoursWorkedOnDate", function () {
//     it("calculates that the employee worked 2 hours", function () {
//       cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
//       updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
//       updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
//       expect(hoursWorkedOnDate(cRecord, "0044-03-15")).to.equal(2)

function hoursWorkedOnDate(employee, date){
    let timeIn = employee.timeInEvents.find(time => {
        return time.date === date;
    })
    let timeOut = employee.timeOutEvents.find(time => {
        return time.date === date;
    })
    return (timeOut.hour - timeIn.hour) / 100
}
// it("calculates that the employee earned 54 dollars", function () {
//     cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
//     updatedBpRecord = createTimeInEvent(cRecord, "0044-03-15 0900")
//     updatedBpRecord = createTimeOutEvent(cRecord, "0044-03-15 1100")
//     expect(wagesEarnedOnDate(cRecord, "0044-03-15")).to.equal(54)

function wagesEarnedOnDate(employee, earningsDate){
    let employeeWage = hoursWorkedOnDate(employee, earningsDate)
    let payRate = employee.payPerHour

    return employeeWage * payRate
}

function allWagesFor(employee){
    let workingDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let payDays = workingDates.reduce(function(memo, dollar){
        return memo + wagesEarnedOnDate(employee, dollar)
    }, 0)
    return payDays
}

let findEmployeeByFirstName = function(src, firstName){
    return src.find(function(a){
        return a.firstName === firstName
    })
}

let calculatePayroll = function(array){
    return array.reduce(function(memo, employee){
        return memo + allWagesFor(employee)
    }, 0)
}