import 'jest-localstorage-mock';
import 'jest-enzyme';
import 'jest-extended';
import 'jest-chain';
import 'jest-styled-components';
import { createSerializer } from 'enzyme-to-json';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));
