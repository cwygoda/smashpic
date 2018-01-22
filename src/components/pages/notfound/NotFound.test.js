import { shallow } from 'enzyme'
import NotFound from '.'

describe('NotFound page', () => {
  it('should render 404 message', () => {
    const component = shallow(<NotFound />)

    const expected = <div>What you are looking for went off trail and can&rsquo;t be found.</div>

    expect(component.contains(expected)).toBe(true)
  })
})
