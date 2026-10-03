import { toast } from 'react-toastify';

/**
 * Extract clean error message from API response or error object
 */
export function extractErrorMessage(error, defaultMsg = 'An unexpected error occurred') {
  if (!error) return defaultMsg;
  if (typeof error === 'string') return error;
  if (error.response?.data?.message) return error.response.data.message;
  if (error.message) return error.message;
  return defaultMsg;
}

/**
 * Display a success toast
 * Automatically prevents duplicate toasts with the same message
 */
export function showSuccessToast(message, options = {}) {
  const msg = typeof message === 'string' ? message : 'Operation completed successfully';
  return toast.success(msg, {
    toastId: options.toastId || `success-${msg}`,
    autoClose: 3500,
    ...options,
  });
}

/**
 * Display an error toast
 * Automatically extracts message from Axios / API errors and prevents duplicate toasts
 */
export function showErrorToast(error, options = {}) {
  const msg = extractErrorMessage(error, options.defaultMessage || 'Operation failed');
  return toast.error(msg, {
    toastId: options.toastId || `error-${msg}`,
    autoClose: 5000,
    ...options,
  });
}

/**
 * Display a warning toast
 */
export function showWarningToast(message, options = {}) {
  const msg = typeof message === 'string' ? message : 'Warning';
  return toast.warning(msg, {
    toastId: options.toastId || `warn-${msg}`,
    autoClose: 4000,
    ...options,
  });
}

/**
 * Display an informational toast
 */
export function showInfoToast(message, options = {}) {
  const msg = typeof message === 'string' ? message : 'Info';
  return toast.info(msg, {
    toastId: options.toastId || `info-${msg}`,
    autoClose: 3500,
    ...options,
  });
}

export { toast };
export default {
  success: showSuccessToast,
  error: showErrorToast,
  warning: showWarningToast,
  info: showInfoToast,
};
