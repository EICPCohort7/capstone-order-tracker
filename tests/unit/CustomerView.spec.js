import { mount, flushPromises } from '@vue/test-utils';
import CustomerView from '../../front-end/src/views/CustomerView';
import ModalForm from '../../front-end/src/components/ModalForm.vue';
// import CustomerInformationModal from '../../front-end/src/components/CustomerInformationModal.vue';
import '@testing-library/jest-dom';

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
  it('should get a button', async () => {
    const wrapper = mount(CustomerView);
    expect(wrapper.find('#getAll').exists()).toBe(true);
  });
  it('should execute the get by email function when clicked with emit flag', async () => {
    const wrapper = mount(CustomerView);
    let button = wrapper.get('#getAll');
    await button.trigger('click');

    expect(wrapper.emitted('flag')).toHaveLength(1);
  });
  it('should execute the get all function when clicked with spy', async () => {
    const spy = jest.spyOn(CustomerView.methods, 'getCustomers');
    const wrapper = mount(CustomerView);

    let button = wrapper.get('#getAll');
    await button.trigger('click');

    expect(spy).toHaveBeenCalled();
  });
  it('should execute the get by email function when clicked and return 1 row', async () => {
    const wrapper = mount(CustomerView);

    let button = wrapper.get('#emailBtn');
    await wrapper.get('#email').setValue('not@really.com');
    await button.trigger('click');
    await flushPromises();
    const rows = wrapper.findAll('tbody tr');
    expect(rows).toHaveLength(1);
  });
  it('should change the modal visibility value on click', async () => {
    const wrapper = mount(CustomerView);
    wrapper.setData({ showModal: false });
    await wrapper.vm.$nextTick();
    let button = wrapper.get('#show-modal');
    await button.trigger('click');

    expect(wrapper.vm.showModal).toBeTruthy();
  });
  it('should show modal if visibility is set to true', async () => {
    const wrapper = mount(CustomerView);
    const modalForm = wrapper.findComponent(ModalForm);
    wrapper.setData({ showModal: false });
    await wrapper.vm.$nextTick();
    let button = wrapper.get('#show-modal');
    await button.trigger('click');

    expect(modalForm.find('#firstName').exists()).toBe(true);
  });

  it('should set visibilty to false after exiting the modal form', async () => {
    const wrapper = mount(CustomerView);
    const modalForm = wrapper.findComponent(ModalForm);
    wrapper.setData({ showModal: true });
    await wrapper.vm.$nextTick();

    let closeButton = modalForm.get('button[class=btn]');

    await wrapper.vm.$nextTick();
    await closeButton.trigger('click');

    await wrapper.vm.$nextTick();
    expect(modalForm.find('#firstName').exists()).toBe(false);
  });
  it('should call a post request when the form is submitted', async () => {
    const spy = jest.spyOn(CustomerView.methods, 'createCustomer');
    const wrapper = mount(CustomerView);
    const modalForm = wrapper.findComponent(ModalForm);
    wrapper.setData({ showModal: true });
    await wrapper.vm.$nextTick();

    let button = modalForm.get('button[type=submit]');
    await button.trigger('click');

    expect(spy).toHaveBeenCalled();
  });
});
