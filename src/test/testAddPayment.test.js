import { mount } from '@vue/test-utils'
import AddPayment from '.././components/AddPayment.vue'

describe('AddPayment.vue', () => {

    const wrapper = mount(AddPayment)

    it('check the cross symbol when button is going to be clicked', async() => {

        const button = wrapper.find('.button')
        const cross = wrapper.find('.cross')

        button.trigger('click')

        expect(cross.text()).toBe('+')
    })

    it('display correct html after click', () => {
        expect(wrapper.html()).toContain('<button class="button">Hide<span class="cross">-</span></button>')
    })
})