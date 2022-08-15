import { effectWatch } from "./reactivity";

export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      // setup会预先执行一次
      const context = rootComponent.setup();
      effectWatch(() => {
        // 每次setup发生变化都是触发effectWatch,从而再次触发render
        rootContainer.innerHTML = "";
        const element = rootComponent.render(context);
        rootContainer.append(element);
      });
    },
  };
}
