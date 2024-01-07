const getBaseUrl = () => process.env.NODE_ENV === 'production' ? process.env.NEXT_PUBLIC_PROD_BASE_URL : process.env.NEXT_PUBLIC_DEV_BASE_URL;

export { getBaseUrl };