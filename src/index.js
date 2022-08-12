import { effectWatch, reactive } from "./dep";

const a = reactive({ xm: { age: 30 }, xh: { age: 18 } });

effectWatch(() => {
  console.log("effectWatch", a.xh.age);
});

setTimeout(() => {
  console.log("setTimeout");
  a.xh = { age: 30 };
}, 2000);
