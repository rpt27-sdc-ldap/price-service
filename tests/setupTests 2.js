import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'regenerator-runtime/runtime'

require('jest-fetch-mock').enableMocks();

fetch.mockResponse(JSON.stringify({ bookId: 1, bookTitle: 'jest test', price: 24.99 }));

configure({ adapter: new Adapter() });

require('mysql2/node_modules/iconv-lite').encodingExists('foo');
