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
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
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
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
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
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
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
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
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
    image:
      "https://res.cloudinary.com/ditsu2meo/image/upload/v1670048529/t1eru2kcxt7jhv8tyjh1.jpg",
    profit: 51555,
    createdAt: "2022-12-05T15:16:53.085Z",
    updatedAt: "2022-12-05T15:16:53.085Z",
    __v: 0,
  },
];

var groupBy = function (xs: any, key: any) {
  return xs.reduce(function (rv: any, x: any) {
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

let x: string = "2006/2007";
// let x: string = "2007/2008";

let arr: string[] = ["2003/2004", "2004/2005", "2005/2006"];

arr.push(x);

console.log(arr);
console.log(arr[arr.length - 1].split("/")[1]);

let xx1 = parseInt(arr[arr.length - 1].split("/")[0]);
let xx = parseInt(arr[arr.length - 1].split("/")[1]);
let xxx = 1;
console.log(xxx);

let yy = "JSS6 A";

let yy1 = parseInt(yy.match(/\d+/)![0]);

console.log(yy1);

if (xxx === 1) {
  yy1 = yy1 + 1;
  yy = yy.replace(yy.match(/\d+/)![0], yy1.toString());
  console.log("change class to: ", yy);
} else {
  yy1;
  console.log("remain in class: ", yy1);
}

// if () {
//   console.log("increases");
// } else {
//   console.log("nothing Happen");
// }

// console.log(parseInt(y[1]));
