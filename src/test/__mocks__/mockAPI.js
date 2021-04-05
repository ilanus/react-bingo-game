import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onAny().reply(() => {
  return [200];
});

export default mock;
