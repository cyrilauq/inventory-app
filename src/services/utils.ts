const getBaseUrl = () => process.env.NODE_ENV === 'production' ? process.env.PROD_BASE_URL : process.env.DEV_BASE_URL;

export { getBaseUrl };