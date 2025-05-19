import { router } from '@inertiajs/react'

const useGoBack = () => {
  const goBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      window.history.back(); // Inertia go back
    } else {
      router.visit('/'); // Fallback to home
    }
  }

  return goBack;
};

export default useGoBack;

