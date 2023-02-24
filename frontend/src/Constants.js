/* istanbul ignore file */

const production = {
  url: 'https://project-t10-schedulecompiler.herokuapp.com',
};
const development = {
  url: 'http://localhost:8000',
};
export const config =
  process.env.NODE_ENV === 'development' ? development : production;
// export const config = development;
