import { shallow } from 'enzyme'
import Version from '.'

describe('Version atom', () => {
  const OLD_ENV = { ...process.env }

  afterEach(() => {
    process.env = { ...OLD_ENV }
  })

  it('renders CI_TAG as version when set', () => {
    process.env.CI_TAG = 'vAwesome'
    const component = shallow(<Version />)
    const expected = 'vAwesome'

    expect(component.contains(expected)).toBe(true)
  })

  it('renders CI_COMMIT as version when no CI_TAG is set', () => {
    process.env.CI_TAG = ''
    process.env.CI_COMMIT = 'abcdefgh'
    const component = shallow(<Version />)
    const expected = 'abcdefgh'

    expect(component.contains(expected)).toBe(true)
  })

  it('renders \'unknown\' as version when neither CI_TAG nor CI_COMMIT is set', () => {
    process.env.CI_TAG = ''
    process.env.CI_COMMIT = ''
    const component = shallow(<Version />)
    const expected = 'unknown'

    expect(component.contains(expected)).toBe(true)
  })
})
