import { reactive } from "./core/reactivity";

export default {
  render(context) {
    const div = document.createElement("div");
    div.innerHTML = context.state.count;
    return div;
  },
  setup() {
    const state = reactive({
      count: 0,
    });
    window.state = state;
    return {
      state,
    };
  },
};
