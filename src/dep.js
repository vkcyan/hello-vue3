// 我们假设Dep是一个具备订阅发布功能的类,他需要具备收集依赖,触发依赖,以及修改,获取值等方法
// 借助get set方法我们就实现了依赖的自动收集与触发
let currentEffect;
class Dep {
  constructor(val) {
    this.effects = new Set();
    this._val = val;
  }

  get value() {
    this.depend();
    return this._val;
  }

  set value(newVal) {
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

// 收集依赖
export function effectWatch(effect) {
  currentEffect = effect;
  effect();
  currentEffect = null;
}

const tartgetMap = new Map();

console.log(tartgetMap);

function getDep(target, key) {
  let depsMap = tartgetMap.get(target);
  if (!depsMap) {
    depsMap = new Map();
    tartgetMap.set(target, depsMap);
  }
  let dep = depsMap.get(key);
  if (!dep) {
    dep = new Dep();
    depsMap.set(key, dep);
  }

  return dep;
}

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
