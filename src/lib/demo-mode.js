export const isDemoMode = (() => {
  const env = import.meta.env || {};
  if (env.VITE_DEMO_MODE === 'true') {
    return true;
  }
  return !env.VITE_BASE44_APP_ID || !env.VITE_BASE44_APP_BASE_URL;
})();
