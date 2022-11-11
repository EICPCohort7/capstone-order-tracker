import { shallowMount, mount } from "@vue/test-utils";
import HelloWorld from "@/components/HelloWorld.vue";
import Modal from "@/components/Modal.vue";
import App from "@/App.vue";
import HomeView from "@/views/HomeView.vue";
import { routes } from "@/router/index.js";

//import "@testing-library/jest-dom";
const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "new message";
    const wrapper = shallowMount(HelloWorld, {
      props: { msg },
    });
    expect(wrapper.text()).toMatch(msg);
  });
});

describe("routing", () => {
  it("Routes to a page", () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router],
      },
    });
    expect(wrapper.html()).toContain("Customers");
  });
});
// describe("Modal.vue", () => {
//   it("shows that modal is a vue instance", () => {
//     const wrapper = Mount(Modal);
//     expect(wrapper.isVueInstance()).toBeTruthy();
//   });
// });
