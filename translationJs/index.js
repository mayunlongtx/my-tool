const fs = require("fs");

// 1. 先读取文件

// read JSON object from file

function getJson() {
  return new Promise((resolve, reject) => {
    fs.readFile("zh.json", "utf-8", (err, data) => {
      if (err) {
        reject("获取失败了");
        console.log(error);
        throw err;
      }
      resolve(JSON.parse(data.toString()));
      // print JSON object
      // console.log(user);
    });
  });
}

let newJson = {};
// 这里通过 async await 语法糖，将异步操作转换成同步操作
(async function () {
  const oldJson = await getJson();
  console.log(translation(oldJson));

  // console.log(oldJson);
})();
// 2. 循环 得到的 JSON 然后 将其翻译并组成新的 JSON

// create a JSON object
const user = {
  id: 1,
  name: "John Doe",
  age: 22,
};

// convert JSON object to string
const data = JSON.stringify(user);

// 3. 将得到的 JSON 写入文件
// write JSON string to a file
// fs.writeFile("user.json", data, (err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("JSON data is saved.");
// });

// 翻译函数
function translation(data) {
  const obj = {};
  translationItem(data);
  function translationItem() {
    for (const key in data) {
      const item = data[key];
      if (typeof item === "string") {
        obj[key] = item;
      } else {
        obj[key] = {};
        translation(item);
      }
    }
  }
  return obj;
}
