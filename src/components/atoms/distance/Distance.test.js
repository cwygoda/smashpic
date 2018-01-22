import { shallow } from 'enzyme'
import Distance from '.'

describe('Distance atom', () => {
  it('renders rounded kilometers distance', () => {
    const component = shallow(<Distance unit='k' value={21.0975} />)
    const expected = '21.1km'

    expect(component.contains(expected)).toBe(true)
  })

  it('renders rounded miles distance', () => {
    const component = shallow(<Distance unit='m' value={21.0975} />)
    const expected = '13.2mi'

    expect(component.contains(expected)).toBe(true)
  })
})
