import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils'
import AddPayment from '.././components/AddPayment.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('AddPayment.vue', () => {
    let mutations
    let store

    beforeEach(() => {
        mutations = {
            addDataToPaymentsList: jest.fn()
        }

        store = new Vuex.Store({
            mutations
        })
    })

    it('run action onClick', async () => {
        const wrapper = shallowMount(AddPayment, {
            store,
            localVue
        })
        const testInput = wrapper.find('.testJest')
        const testInput2 = wrapper.find('.testJest2')
        const testInput3 = wrapper.find('.testJest3')

        let promiseExecute = new Promise(function (resolve, reject) {
            resolve(
                testInput.setValue("27.10.2021"),
                testInput2.setValue("Food"),
                testInput3.setValue("300")
            )

            promiseExecute.then(() => {
                clickInput()
            }).then(() => {
                clickButton()
            }).then(() => {
                expect(mutations.addDataToPaymentsList).toHaveBeenCalled()
            }).catch(error =>
                console.log('Promise to execute did not accomplish: ', error)
            )

            function clickInput() {
                testInput.trigger('input')
                testInput2.trigger('input')
                testInput3.trigger('input')
            }

            function clickButton() {
                const btn = wrapper.find('button[name="btn"]')
                btn.trigger('click')
            }
            expect(mutations.addDataToPaymentsList).toHaveBeenCalled()
        })
    })
})