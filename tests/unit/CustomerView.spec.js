import { mount, flushPromises } from '@vue/test-utils';
import CustomerView from '@/views/CustomerView';

describe('Customer View', () => {
  it('should do a basic test', () => {
    let wrapper = mount(CustomerView);
    expect(wrapper).not.toBeNull();
  });

  it('should render the correct number of rows', async () => {
    let wrapper = mount(CustomerView);
    await flushPromises();
    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(2);
  });
  it('should execute the get by email function when clicked', async () => {
    const wrapper = mount(CustomerView);
    const spyClose = jest.spyOn(CustomerView.methods, 'getEmail');
    await wrapper.find('input[id=email]').setValue('name@mail.com');
    await wrapper.find('button').trigger('click');
    expect(spyClose).toBeCalled();
  });
});
