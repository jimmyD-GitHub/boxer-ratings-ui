import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

HTMLCanvasElement.prototype.getContext = () => {
  // return whatever getContext has to return
};

console.warn = () => {
  // turn off warnings about renamed lifecycle methods, for now.
};