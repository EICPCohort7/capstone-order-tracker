import { mount } from '@vue/test-utils';
import HelloWorld from '@/components/HelloWorld';
import HomeVue from '@/views/HomeView';

describe('Basic tests', () => {
  it('should test simple math', () => {
    expect(2 + 2).toBe(4);
  });
});

describe('HelloWorld', () => {
  it('using standard @vue/test-utils', () => {
    let testMessage = 'Test message';
    const wrapper = mount(HelloWorld, {
      props: {
        msg: testMessage,
      },
    });

    let header = wrapper.find('h1');
    expect(header.text()).toEqual(testMessage);
  });
});

describe('HomeView', () => {
  it('using standard @vue/test-utils', () => {
    let wrapper = mount(HomeVue);
    let helloWorld = wrapper.findComponent(HelloWorld);
    let header = helloWorld.find('h1');
    expect(header.text()).toEqual('Welcome to the TJX CSR home page');
  });
});
