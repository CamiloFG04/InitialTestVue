import { shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";

describe('Counter Component', ()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallowMount(Counter);
    })
    // test('match with snapshot', () => {

    //     const wrapper = shallowMount(Counter)

    //     expect(wrapper.html()).toMatchSnapshot()
    // });
    test('h2 should have default value "Counter"', () => {

        expect(wrapper.find('h2').exists()).toBeTruthy();

        const h2 = wrapper.find('h2').text();
        
        expect(h2).toBe("Counter")
    });

    test('should be 100 by default in <p>', () => {

        const p = wrapper.find('[data-testid="counter"]').text();

        expect(p).toBe("100")
        
    });

    test('must increment and decrement the value of the counter', async() => {
  
        const [increaseBtn,decreaseBtn] = wrapper.findAll('button');
        
        await increaseBtn.trigger('click')
        await increaseBtn.trigger('click')

        await decreaseBtn.trigger('click')
        await decreaseBtn.trigger('click')

        const p = wrapper.find('[data-testid="counter"]').text();

        
        expect(p).toBe("100")
    });

    test('should set the default value', () => {
        const {start} = wrapper.props()
        const value = wrapper.find('[data-testid="counter"]').text();
        expect(value).toBe(String(start))
    });

    test('should prop title', () => {
        const title = 'Hola Title'
        const wrapper = shallowMount(Counter,{
            props:{
                title
            }
        });
        const value = wrapper.find('h2').text();
        expect(value).toBe(title)
    });

})