export const register = () => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('./service_worker.js')
          console.info('Service Worker registered:', registration)
        }
        catch(e) {
          console.warn('Service Worker registration failed:', e);
        }
      })
    }
  }
  