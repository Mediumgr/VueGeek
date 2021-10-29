import {mount} from '@vue/test-utils'
import PaymentsDisplay from '.././components/PaymentsDisplay.vue'

describe('PaymentsDisplay', () => {
    test("Test Content Component", () => {
        const wrapper = mount(PaymentsDisplay, {
            propsData: {
                total: 700
            }
        })
        const total = wrapper.find('.total')
        expect(total.text()).toEqual(
            'Total: 700'
        )
    });

    test("Test Content html", () => {
        const wrapper = mount(PaymentsDisplay, {
            propsData: {
                total: 100,
                length: 0
            }
        })
        const total = wrapper.find('.total')

        expect(total.html()).toEqual(
            '<div class="total">Total: 100</div>'
        )
        const emptyEelements = wrapper.find('.emptyEelements')
        expect(emptyEelements.html()).toEqual('<div class="emptyEelements">Список пуст</div>')

    });

    test("Test Content toContain", () => {
        const wrapper = mount(PaymentsDisplay, {
            propsData: {
                total: 300
            }
        })

        expect(wrapper.text()).toContain(
            'Total: 300'
        )
    });
})

