import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormView from '../FormView.vue'

describe('Validate display of form page view', () => {
  it('Form renders properly', () => {
    const wrapper = mount(FormView)
    expect(wrapper.text()).toContain('Personal Information')
  })

  it('Progress bar displays properly', () => {
    const wrapper = mount(FormView)
    expect(wrapper.find('#progress-bar').exists()).toBe(true)
  })

  it('Navigation buttons displays properly', () => {
    const wrapper = mount(FormView)
    expect(wrapper.find('#nav-buttons').exists()).toBe(true)
  })
})
