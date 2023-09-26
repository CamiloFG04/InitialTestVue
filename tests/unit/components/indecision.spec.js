import { shallowMount } from "@vue/test-utils";
import Indecision from "@/components/Indecision";

describe('Indecicion Component', () => {
    let wrapper;
    let clgSpy;
    let input;

    global.fetch = jest.fn(()=> Promise.resolve({
        json: ()=> Promise.resolve({
            answer: 'yes',
            forced: false,
            image: 'https://yesno.wtf/assets/yes/2.gif'
        })
    }))

    beforeEach(() => {
        wrapper = shallowMount(Indecision)
        clgSpy = jest.spyOn(console,'log')
        input = wrapper.find('input');
        jest.clearAllMocks()
    });

    test('should be match with snapshot', () => {
        expect(wrapper.html()).toMatchSnapshot()
    });

    test('writing to the input should not trigger anything just console.log', async () => {
        const getAnswerSpy = jest.spyOn(wrapper.vm,'getAnswer')
        await input.setValue('Hola')
        expect(clgSpy).toHaveBeenCalled();
        expect(getAnswerSpy).not.toHaveBeenCalled();
    });

    test('writing "?" must trigger getAnswer ', async() => {
        const getAnswerSpy = jest.spyOn(wrapper.vm,'getAnswer')
        await input.setValue('Hola?')
        expect(getAnswerSpy).toHaveBeenCalled();
    });

    test('tests in getAnswer', async () => {
        await wrapper.vm.getAnswer()
        const img = wrapper.find('img').exists()

        expect(img).toBeTruthy()

        expect(wrapper.vm.img).toBe('https://yesno.wtf/assets/yes/2.gif')

        expect(wrapper.vm.answer).toBe('yes')
    });

    test('test in getAnswer - failure in API', async() => {
        fetch.mockImplementationOnce(()=>Promise.reject('Error'))
        await wrapper.vm.getAnswer()

        const img = wrapper.find('img').exists()
        expect(img).toBeFalsy()
        expect(wrapper.vm.answer).toBe('Error Server 500')
    });
});