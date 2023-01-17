"use strict";
let myData = [
    {
        _id: "638e0e67cabacd9c66026f41",
        date: "Tuesday, December 5th 2022, 3:29:43",
        hubName: "Idowu",
        totalExpense: 7000,
        totalSales: 101000,
        submittedBy: "Blessed Uzorma",
        note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
        dated: "Tuesday, December 5th 2022",
        detail: [Array],
        image: "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
        profit: 94000,
        createdAt: "2022-12-05T15:29:43.448Z",
        updatedAt: "2022-12-05T15:29:43.448Z",
        __v: 0,
    },
    {
        _id: "638e0bbdcabacd9c66026ed8",
        date: "Tuesday, December 5th 2022, 3:29:43",
        hubName: "Idowu",
        totalExpense: 6500,
        totalSales: 80000,
        submittedBy: "Blessed Uzorma",
        note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
        dated: "Tuesday, December 5th 2022",
        detail: [Array],
        image: "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
        profit: 73500,
        createdAt: "2022-12-05T15:18:21.196Z",
        updatedAt: "2022-12-05T15:18:21.196Z",
        __v: 0,
    },
    {
        _id: "638e0b65cabacd9c66026eb2",
        date: "Monday, December 5th 2022, 3:16:53",
        hubName: "Idowu",
        totalExpense: 43000,
        totalSales: 94555,
        submittedBy: "Blessed Uzorma",
        note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
        dated: "Monday, December 5th 2022",
        detail: [Array],
        image: "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
        profit: 51555,
        createdAt: "2022-12-05T15:16:53.085Z",
        updatedAt: "2022-12-05T15:16:53.085Z",
        __v: 0,
    },
    {
        _id: "638e0b65cabacd9c66026eb2",
        date: "Wednesday, December 5th 2022, 3:16:53",
        hubName: "Idowu",
        totalExpense: 43000,
        totalSales: 94555,
        submittedBy: "Blessed Uzorma",
        note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
        dated: "Wednesday, December 5th 2022",
        detail: [Array],
        image: "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
        profit: 51555,
        createdAt: "2022-12-05T15:16:53.085Z",
        updatedAt: "2022-12-05T15:16:53.085Z",
        __v: 0,
    },
    {
        _id: "638e0b65cabacd9c66026eb2",
        date: "Wednesday, December 5th 2022, 3:16:53",
        hubName: "Idowu",
        totalExpense: 43000,
        totalSales: 94555,
        submittedBy: "Blessed Uzorma",
        note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
        dated: "Wednesday, December 5th 2022",
        detail: [Array],
        image: "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
        profit: 51555,
        createdAt: "2022-12-05T15:16:53.085Z",
        updatedAt: "2022-12-05T15:16:53.085Z",
        __v: 0,
    },
];
var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
var groubedByTeam = groupBy(myData, "dated");
console.log("start...");
console.log("");
console.log("");
console.log("");
// console.log(groubedByTeam);
// console.log(myData.reduce();
let res = Object.values(groubedByTeam);
// console.log(
//   "Dated: ",
//   res
//   // .flat()
//   // .map((el) => {
//   //   return el.profit;
//   // })
//   // .reduce((a, b) => a + b)
// );
// console.log(Object.values(groubedByTeam).flat());
// console.log(219055 * 0.001);
var bills = [
    {
        refNo: 17,
        billDate: "1-apr-2016",
        dueDate: "30-apr-2016",
        pendingAmount: 4500,
        overdueDays: 28,
    },
    {
        refNo: 20,
        billDate: "15-apr-2016",
        dueDate: "3-may-2016",
        pendingAmount: 56550,
        overdueDays: 15,
    },
];
var resData = bills
    .map((bill) => bill.pendingAmount)
    .reduce((acc, bill) => bill + acc);
// console.log(resData);
// console.log(bills.length);
let x = "2006/2007";
// let x: string = "2007/2008";
let arr = ["2003/2004", "2004/2005", "2005/2006"];
arr.push(x);
console.log(arr);
console.log(arr[arr.length - 1].split("/")[1]);
let xx1 = parseInt(arr[arr.length - 1].split("/")[0]);
let xx = parseInt(arr[arr.length - 1].split("/")[1]);
let xxx = 1;
console.log(xxx);
let yy = "JSS6 A";
let yy1 = parseInt(yy.match(/\d+/)[0]);
console.log(yy1);
if (xxx === 1) {
    yy1 = yy1 + 1;
    yy = yy.replace(yy.match(/\d+/)[0], yy1.toString());
    console.log("change class to: ", yy);
}
else {
    yy1;
    console.log("remain in class: ", yy1);
}
// if () {
//   console.log("increases");
// } else {
//   console.log("nothing Happen");
// }
// console.log(parseInt(y[1]));
// let score: number = 40;
let scoreGrade = (score) => {
    if (score < 60) {
        return "F";
    }
    else if (score < 70) {
        return "D";
    }
    else if (score < 80) {
        return "C";
    }
    else if (score < 90) {
        return "B";
    }
    else if (score < 100) {
        return "A";
    }
};
// console.log(scoreGrade(70));
const outJSON = [
    {
        team: "TeamA",
        name: "Ahmed",
        field3: "val3",
    },
    {
        team: "TeamB",
        name: "Ahmed",
        field3: "val43",
    },
    {
        team: "TeamA",
        name: "Ahmed",
        field3: "val55",
    },
];
let data = [
    {
        _id: "638e0bbdcabacd9c66026ed8",
        date: "Monday, December 5th 2022, 3:18:21",
        hubName: "Idowu",
        totalExpense: 6500,
        totalSales: 80000,
        submittedBy: "Blessed Uzorma",
        note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
        dated: "Monday, December 5th 2022",
        detail: [
            {
                item: "ffeer",
                cost: 3500,
                status: "expense",
                id: 1,
            },
            {
                item: "Fuel",
                cost: 3000,
                status: "expense",
                id: 2,
            },
            {
                item: "rent",
                cost: 50000,
                status: "sales",
                id: 3,
            },
            {
                item: "car ride",
                cost: 30000,
                status: "sales",
                id: 4,
            },
        ],
        image: "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
        profit: 73500,
        createdAt: "2022-12-05T15:18:21.196Z",
        updatedAt: "2022-12-05T15:18:21.196Z",
        __v: 0,
    },
    {
        _id: "638e0b65cabacd9c66026eb2",
        date: "Monday, December 5th 2022, 3:16:53",
        hubName: "Idowu",
        totalExpense: 43000,
        totalSales: 94555,
        submittedBy: "Blessed Uzorma",
        note: "The day went all nice and well... Wwe really Thank God for today's business sales and outcome! ",
        dated: "Monday, December 5th 2022",
        detail: [
            {
                item: "Fuel",
                cost: 3000,
                status: "expense",
                id: 1,
            },
            {
                item: "rent",
                cost: 50000,
                status: "sales",
                id: 2,
            },
            {
                item: "car",
                cost: 44555,
                status: "sales",
                id: 3,
            },
            {
                item: "Pay",
                cost: 40000,
                status: "expense",
                id: 4,
            },
        ],
        image: "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
        profit: 51555,
        createdAt: "2022-12-05T15:16:53.085Z",
        updatedAt: "2022-12-05T15:16:53.085Z",
        __v: 0,
    },
];
var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};
const groupData = (data, props) => {
    return data.reduce((el, newEL) => {
        (el[newEL[props]] = el[newEL[props]] || []).push(newEL);
        return el;
    }, {});
};
let newData = [
    {
        _id: "63bc34da3d90685cd45741dc",
        totalScore: 20,
        right: 2,
        failed: 0,
        maxLength: 2,
        gradeScore: 10,
        precentage: "100.00%",
        grade: "A",
        teacherName: "Precious Agbagba II",
        studentName: "Vicky Tunde",
        testTitle: "Gravity",
        testName: "Physics",
        createdAt: "2023-01-09T15:38:02.495Z",
        updatedAt: "2023-01-09T15:38:02.495Z",
        __v: 0,
    },
    {
        _id: "63bc32253d90685cd4572caf",
        totalScore: 30,
        right: 3,
        failed: 0,
        maxLength: 3,
        gradeScore: 10,
        precentage: "100.00%",
        grade: "A",
        teacherName: "Precious Agbagba II",
        studentName: "Vicky Tunde",
        testTitle: "Motion (Gravity)",
        testName: "Physics",
        createdAt: "2023-01-09T15:26:29.689Z",
        updatedAt: "2023-01-09T15:26:29.689Z",
        __v: 0,
    },
    {
        _id: "63bab418698f2d4add089fab",
        totalScore: 30,
        right: 3,
        failed: 0,
        maxLength: 3,
        gradeScore: 10,
        precentage: "100.00%",
        grade: "A",
        teacherName: "Precious Agbagba II",
        studentName: "Vicky Tunde",
        testTitle: "Organic Chemistry 101",
        testName: "Chemistry",
        createdAt: "2023-01-08T12:16:24.116Z",
        updatedAt: "2023-01-08T12:16:24.116Z",
        __v: 0,
    },
];
var groubedTestName = groupData(newData, "testName");
// console.log("start...");
// console.log("");
// console.log("");
let resTest = Object.values(groubedTestName);
const realData = [
    [
        {
            _id: "63bc34da3d90685cd45741dc",
            totalScore: 20,
            right: 2,
            failed: 0,
            maxLength: 2,
            gradeScore: 10,
            precentage: "100.00%",
            grade: "A",
            teacherName: "Precious Agbagba II",
            studentName: "Vicky Tunde",
            testTitle: "Gravity",
            testName: "Physics",
            createdAt: "2023-01-09T15:38:02.495Z",
            updatedAt: "2023-01-09T15:38:02.495Z",
            __v: 0,
        },
        {
            _id: "63bc32253d90685cd4572caf",
            totalScore: 30,
            right: 3,
            failed: 0,
            maxLength: 3,
            gradeScore: 10,
            precentage: "100.00%",
            grade: "A",
            teacherName: "Precious Agbagba II",
            studentName: "Vicky Tunde",
            testTitle: "Motion (Gravity)",
            testName: "Physics",
            createdAt: "2023-01-09T15:26:29.689Z",
            updatedAt: "2023-01-09T15:26:29.689Z",
            __v: 0,
        },
    ],
    [
        {
            _id: "63bab418698f2d4add089fab",
            totalScore: 30,
            right: 3,
            failed: 0,
            maxLength: 3,
            gradeScore: 10,
            precentage: "100.00%",
            grade: "A",
            teacherName: "Precious Agbagba II",
            studentName: "Vicky Tunde",
            testTitle: "Organic Chemistry 101",
            testName: "Chemistry",
            createdAt: "2023-01-08T12:16:24.116Z",
            updatedAt: "2023-01-08T12:16:24.116Z",
            __v: 0,
        },
    ],
];
// console.log(
//   resTest.map((el: any) => {
//     return el.map((el: any) => {
//       return el.totalScore;
//     });
//   })
// );
// console.log(
//   "Dated: ",
//   realData
//     // .flat()
//     .map((el: any) => {
//       return el.totalScore;
//     })
//     .reduce((a, b) => a + b)
// );
// console.log(Object.values(groubedByTeam).flat());
// const xx24 = [[20, 30], [30]];
// console.log(
//   xx24.map((el: any) => {
//     return el.reduce((a: any, b: any) => {
//       return a + b;
//     });
//   })
// );
const checkData = realData
    .map((el) => {
    return el.map((el) => {
        return el.totalScore;
    });
})
    .map((el) => {
    return el;
})
    .map((el) => {
    return el.reduce((a, b) => {
        return a + b;
    });
});
console.log(checkData);
