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
    it('check the cross symbol when the button is not clicked', async () => {
        const cross = wrapper.find('.cross')
        expect(cross.text()).toBe('+')
    })

    it('display correct html before click', () => {
        const button = wrapper.find('button[name="btn"]')
        expect(button.html()).toContain('Add')
    })
})