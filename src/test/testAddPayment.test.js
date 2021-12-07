import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils'
import VueRouter from 'vue-router'
import AddPayment from '.././components/AddPayment.vue'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('AddPayment.vue', () => {

    const wrapper = shallowMount(AddPayment, {
        localVue,
        router
    })

    it('check the cross symbol when button is going to be clicked', async () => {

        const button = wrapper.find('.button')
        const cross = wrapper.find('.cross')

        button.trigger('click')

        expect(cross.text()).toBe('+')
    })

    it('display correct html after click', () => {
        const button = wrapper.find('.button')
        button.trigger('click')
        expect(button.html()).toContain('<button class="button">Hide<span class="cross">-</span></button>')
    })
})