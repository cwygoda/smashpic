import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router'
import Route from './Route'

describe('Route', () => {
  it('renders component on public route', () => {
    const Component = () => 'I\'m public'
    const component = mount(
      <MemoryRouter initialEntries={['/test']}>
        <Route path='/test' component={Component} />
      </MemoryRouter>
    )
    const expected = 'I\'m public'

    expect(component.text()).toBe(expected)
  })

  it('doesn\'t render on wrong route', () => {
    const Component = () => 'I\'m public'
    const component = mount(
      <MemoryRouter initialEntries={['/test2']}>
        <Route path='/test' component={Component} />
      </MemoryRouter>
    )
    expect(component.html()).toBe(null)
  })

  it('redirects to auth for private route without token', () => {
    const Component = () => 'I\'m private'
    const AuthComponent = () => 'I\'m auth'
    const component = mount(
      <MemoryRouter initialEntries={['/test']}>
        <div>
          <Route path='/test' private component={Component} />
          <Route path='/auth/smashrun' component={AuthComponent} />
        </div>
      </MemoryRouter>
    )
    expect(component.text()).toBe('I\'m auth')
  })

  it('renders private route with token', () => {
    const Component = () => 'I\'m private'
    const component = mount(
      <MemoryRouter initialEntries={['/test']}>
        <Route path='/test' token='abc' private component={Component} />
      </MemoryRouter>
    )
    expect(component.text()).toBe('I\'m private')
  })
})
