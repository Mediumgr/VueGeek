import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils'
import AddPayment from '.././components/AddPayment.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('AddPayment.vue', () => {
    let actions
    let store

    beforeEach(() => {
        actions = {
            addData: jest.fn()
        }

        store = new Vuex.Store({
            actions
        })
    })

    it('run action onClick', async () => {
        const wrapper = shallowMount(AddPayment, {
            store,
            localVue
        })

        const testInput = wrapper.find('input[name=testJest]')
        const testInput2 = wrapper.find('input[name=testJest2]')
        const testInput3 = wrapper.find('input[name=testJest3]')

        testInput.element.value = "27.10.2021"
        testInput2.element.value = "Food"
        testInput3.element.value = "300"

        testInput.trigger('input')
        testInput2.trigger('input')
        testInput3.trigger('input')

        const btn = wrapper.find('.testBtn')

        await localVue.nextTick() //дожидается обновление DOM перед кликом на .testBtn

        btn.trigger('click')

        expect(actions.addData).toHaveBeenCalled()

        /* 2-ой вариант - обновление input через Promise перед нажатием на кнопку testBtn без строчки №46 await localVue.nextTick():

        const testInput = wrapper.find('input[name=testJest]')
        const testInput2 = wrapper.find('input[name=testJest2]')
        const testInput3 = wrapper.find('input[name=testJest3]')

        let promiseExecute = new Promise(function (resolve, reject) {
            resolve(
                testInput.element.value = "27.10.2021",
                testInput2.element.value = "Food",
                testInput3.element.value = "300")
        })

        promiseExecute.then(() => {
            clickInput()
        }).then(() => {
            clickButton()
        }).then(() => {
            expect(actions.addData).toHaveBeenCalled()
        }).catch(error =>
            console.log('Promise to execute did not accomplish: ', error)
        )

        function clickInput() {
            testInput.trigger('input')
            testInput2.trigger('input')
            testInput3.trigger('input')
        }

        function clickButton() {
            const btn = wrapper.find('.testBtn')
            btn.trigger('click')
        }
        */

        /*      3-й вариант через async/await:

                const testInput = wrapper.find('input[name=testJest]')
                const testInput2 = wrapper.find('input[name=testJest2]')
                const testInput3 = wrapper.find('input[name=testJest3]')

                async function promiseExecute() {
                    console.log("promiseExecution started...")
                    try {
                        await inputValue();
                        console.log("inputValue done")
                        await clickInput();
                        console.log("clickInput done")
                        await clickButton();
                        console.log("clickButton done")
                        expect(actions.addData).toHaveBeenCalled()
                        console.log("success")
                    } catch (error) {
                        console.log(error)
                    }
                }

                async function inputValue() {
                    testInput.element.value = "27.10.2021";
                    testInput2.element.value = "Food";
                    testInput3.element.value = "300";
                }

                async function clickInput() {
                    testInput.trigger('input')
                    testInput2.trigger('input')
                    testInput3.trigger('input')
                }

                async function clickButton() {
                    const btn = wrapper.find('.testBtn')
                    btn.trigger('click')
                }

                promiseExecute() */
    })
})