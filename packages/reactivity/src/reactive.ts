import { isObject } from "@vue/shared";

// 将数据转化为响应式对象，只能做对象代理
/**
 *
 * @param object
 */
export function reactive(target: any) {
  if (!isObject(target)) {
    return;
  }
  // 并没有重新定义属性,只是代理,在set get的时候调用
  const proxy = new Proxy(target, {
    // receiver 是proxy自己
    get(target, key, receiver) {
      //   return target[key];
      return Reflect.get(target, key, receiver );
    },
    set(target, key, value, receiver) {
      target[key] = value;
      return true;
    },
  });
  return proxy;
}

// 为什么get更新的时候使用reflect,而不是直接赋值
// 因为直接复制可能会导致对方内方法访问内部数据无法被监控到,而reflect可以修改函数的this指向

let test = {
  name: "张三",
  get getName() {
    return this.name;
  },
};

// 我们通过proxy对test进行处理后,我去请求proxy.getName 便会走一次get,此时this指向test本身,便不会再进行proxy的get,这就会导致仅仅会触发一次get
// 而通过reflect.get方法,可以通过第三个参数强制this指向,这样this.name就会继续走proxy的get方法
