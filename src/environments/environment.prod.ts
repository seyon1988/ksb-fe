const isBrowser = typeof window !== 'undefined';
const isLocalhost = isBrowser && (
  window.location.hostname === 'localhost' || 
  window.location.hostname === '127.0.0.1'
);

export const environment = {
  production: true,
  apiUrl: isLocalhost 
    ? 'http://localhost:8000/api' 
    : 'https://ksb-be.vercel.app/api'
};
