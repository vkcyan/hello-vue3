// 我们假设Dep是一个具备订阅发布功能的类,他需要具备收集依赖,触发依赖,以及修改,获取值等方法
// 借助get set方法我们就实现了依赖的自动收集与触发
let currentEffect;
class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }

  get value() {
    console.log("getgetget");
    this.depend();
    return this._val;
  }

  set value(newVal) {
    console.log("setsetset");
    this._val = newVal;
    this.notice();
  }

  // 1. 收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect);
    }
  }
  // 2. 触发依赖
  notice() {
    this.effects.forEach((effect) => effect());
  }
}

/**
 * 收集依赖
 * @param {Function} effect
 */
export function effectWatch(effect) {
  currentEffect = effect;
  effect();
  currentEffect = null;
}

const tartgetMap = new Map();

window.tartgetMap = tartgetMap;

function getDep(target, key) {
  let depsMap = tartgetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    tartgetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep(); // dep的get/set函数不会触发,因为并不是通过单个值进行修改而是对父级的值进行修改 所以需要手动收集订阅依赖
    depsMap.set(key, dep);
  }
  return dep;
}

/**
 * 创建一个reactive的对象
 * @param {any} raw
 * @returns
 */
export function reactive(raw) {
  return new Proxy(raw, {
    get(target, key) {
      let dep = getDep(target, key);
      // 收集依赖
      dep.depend();
      return Reflect.get(target, key);
    },
    set(target, key, value) {
      console.log(target, key, value);
      const dep = getDep(target, key);
      const result = Reflect.set(target, key, value);
      dep.notice();
      return result;
    },
  });
}
