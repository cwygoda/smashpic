import './test-polyfills'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

global.mockStore = configureStore([thunk])
