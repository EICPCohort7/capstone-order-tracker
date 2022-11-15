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
});
