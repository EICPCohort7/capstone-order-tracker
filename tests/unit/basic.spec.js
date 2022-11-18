import { mount } from '@vue/test-utils';
import HelloWorld from '../../front-end/src/components/HelloWorld.vue';
import HomeView from '../../front-end/src/views/HomeView';

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
    let wrapper = mount(HomeView);
    let header = wrapper.find('h1');
    expect(header.text()).toEqual('Welcome to the CSR Home Page');
  });
});
