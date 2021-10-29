import {
    shallowMount,
    createLocalVue
} from '@vue/test-utils'
import PutCategory from '.././components/PutCategory.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()

localVue.use(Vuex)

describe('PutCategory.vue', () => {
    let actions
    let store

    beforeEach(() => {
        actions = {
            addToForm: jest.fn()
        }

        store = new Vuex.Store({
            actions
        })
    })

    it('run action addToForm',  () => {
        const wrapper = shallowMount(PutCategory, {
            store,
            localVue
        })

        const testInput = wrapper.find('.add')
      
        testInput.element.value = "AddedFromTheTest"

        testInput.trigger('input')

        const btn = wrapper.find('.button')

        btn.trigger('click')

        expect(actions.addToForm).toHaveBeenCalled()
    })
})