import timezoneMock from 'timezone-mock'
import { shallow } from 'enzyme'
import DateDisplay from '.'

describe('DateDisplay atom', () => {
  it('renders ISOString', () => {
    timezoneMock.register('US/Eastern')
    const component = shallow(<DateDisplay date={'2018-01-22T14:27:53.528Z'} />)
    timezoneMock.unregister()
    const expected = 'Jan 22nd, 9:27'
    expect(component.contains(expected)).toBe(true)
  })
})
