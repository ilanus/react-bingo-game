// Helper function for easier setTimeout -> needed for async testing of App Router
global.sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

global.RetailPortal = {
  getToken: jest.fn(),
  getUser: jest.fn(() => Promise.resolve()),
  getLoginUrl: jest.fn(() => Promise.resolve()),
  eventEmitter: {
    on: jest.fn(),
  },
  getAnalytics: jest.fn(() => () => {}),
};

global.nextTick = () => new Promise(res => process.nextTick(res));
