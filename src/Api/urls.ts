const env = process.env.REACT_APP_STAGE;

const prodUrl = 'http://ec2-18-156-197-166.eu-central-1.compute.amazonaws.com:8080/';
export const BASE_URL = env === 'prod' ? prodUrl : 'http://localhost:8000';
