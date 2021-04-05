// see https://github.com/airbnb/enzyme/issues/1587#issuecomment-442498202 for more information
const waitForAsync = async component => {
  await new Promise(resolve => setImmediate(resolve));
  component.update();
};

export default waitForAsync;
