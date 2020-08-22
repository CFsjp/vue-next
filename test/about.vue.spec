import { mount } from '@vue/test-utils'
import Component from '@/components/views/About.vue'

describe('页面展示测试', () => {
  test('检查元素是否存在', () => {
    const wrapper = mount(Component)
    expect(wrapper.contains('.about h2')).toBe(true)
    console.log(wrapper.find('.about h2').text())
    expect(wrapper.text()).toContain('Welcome')
  })
})
