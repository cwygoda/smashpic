import { shallow } from 'enzyme'
import Duration from '.'

describe('Duration atom', () => {
  it('renders seconds', () => {
    const component = shallow(<Duration value={9} />)
    const expected = '00:09'

    expect(component.contains(expected)).toBe(true)
  })

  it('renders minutes', () => {
    const component = shallow(<Duration value={330} />)
    const expected = '05:30'

    expect(component.contains(expected)).toBe(true)
  })

  it('renders hours', () => {
    const component = shallow(<Duration value={7172} />)
    const expected = '01:59:32'

    expect(component.contains(expected)).toBe(true)
  })
})
