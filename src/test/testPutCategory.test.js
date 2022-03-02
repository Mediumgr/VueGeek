import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils'
import PutCategory from '.././components/PutCategory.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('PutCategory.vue', () => {
    let mutations
    let store

    beforeEach(() => {
        mutations = {
            addDataToForm: jest.fn()
        }

        store = new Vuex.Store({
            mutations
        })
    })

    it('run action addToForm', () => {
        const wrapper = shallowMount(PutCategory, {
            store,
            localVue
        })
        const testInput = wrapper.find('.add')

        let promiseExecute = new Promise(function (resolve, reject) {
            resolve(
                testInput.setvalue("AddedFromTheTest")
            )

            promiseExecute.then(() => {
                clickInput()
            }).then(() => {
                clickButton()
            }).then(() => {
                expect(mutations.addDataToForm).toHaveBeenCalled()
            }).catch(error =>
                console.log('Promise to execute did not accomplish: ', error)
            )

            function clickInput() {
                testInput.trigger('input')
            }

            function clickButton() {
                const btn = wrapper.find('button[name="btn"]')
                btn.trigger('click')
            }

            expect(mutations.addDataToForm).toHaveBeenCalled()
        })
    })
})