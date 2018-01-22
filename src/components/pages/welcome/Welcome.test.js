import { shallow } from 'enzyme'
import { Link } from 'react-router-dom'
import Welcome from './Welcome'

describe('Welcome page', () => {
  it('should render Runner as name when not known', () => {
    const component = shallow(<Welcome />)

    const expected1 = <h1>Hello, Runner</h1>
    const expected2 = <Link to='/run'>Let&rsquo;s go</Link>

    expect(component.contains(expected1)).toBe(true)
    expect(component.contains(expected2)).toBe(true)
  })

  it('should render firstName when passed', () => {
    const component = shallow(<Welcome firstName='Emil' />)

    const expected1 = <h1>Hello, Emil</h1>
    const expected2 = <Link to='/run'>Let&rsquo;s go</Link>

    expect(component.contains(expected1)).toBe(true)
    expect(component.contains(expected2)).toBe(true)
  })
})
