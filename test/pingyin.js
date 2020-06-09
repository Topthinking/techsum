var pinyin = require("pinyin");

console.log(
  pinyin("这是一个react语法", {
    style: pinyin.STYLE_NORMAL, // 设置拼音风格
  })
);
