require('datejs')

// // let dt = new Date('February 28, 2023 11:30:25')
// // let no_of_months = 3
// // // dt.setMonth(dt.getMonth() + no_of_months)
// // console.log(dt.setMonth(dt.getMonth() + no_of_months))

// // Code the show current time
// // let ct = document.getElementById('currentTime')
// let currentDate = Date.now()
// // ct.innerText += new Date(currentDate).toLocaleDateString()

// // Code to add 3 Months to current Time
// // let ut = document.getElementById("updatedTime")
// // let dt = new Date("January 30, 2023 11:30:25")
// // let no_of_months = 1
// // dt.setMonth(dt.getMonth() + no_of_months)
// // ut.innerText += dt.toLocaleDateString()

// // var newDate = new Date(date.setMonth(date.getMonth()+8));
// // console.log(newDate)

// // let d = new Date("2023-01-30");
// // console.log(d); //Sun Feb 20 2022

// // d.setMonth(d.getMonth() + 1);
// // console.log(d); //Sun Mar 20 2022

// // let array = ['a' , 'b' , 'c']
// // console.log(array[array.length - 1])

// // will use date js for fees section

// function addMonths(date, months) {
//     var d = date.getDate();
//     date.setMonth(date.getMonth() + +months);
//     if (date.getDate() != d) {
//       date.setDate(0);
//     }
//     return date;
// }

// // Add 12 months to 29 Feb 2016 -> 28 Feb 2017

// // // Subtract 1 month from 1 Jan 2017 -> 1 Dec 2016
// // console.log(addMonths(new Date(2017,0,1),-1).toString());

// // // Subtract 2 months from 31 Jan 2017 -> 30 Nov 2016
// // console.log(addMonths(new Date(2017,0,31),-2).toString());

// // // Add 2 months to 31 Dec 2016 -> 28 Feb 2017
// // console.log(addMonths(new Date(2016,11,31),2).toString());
let day = new Date('2023-05-08')
console.log(day.addMonths(1).toString('yyyy-MM-d'))
let updateDate = new Date(day.addMonths(1).toString('yyyy-MM-d'))
console.log(updateDate.add({ days: 3 }).toString('yyyy-MM-d'))

// let reminderDate = new Date("2023-05-08")
// const feeDate = reminderDate.add({ days: 3 }).toString('yyyy-MM-dd')
// console.log(feeDate)

// console.log(day);
