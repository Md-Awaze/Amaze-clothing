import { Appearance } from '@stripe/stripe-js';

export const appearance: Appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#4F46E5',
    colorBackground: '#ffffff',
    colorText: '#1F2937',
    colorDanger: '#dc2626',
    fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
    spacingUnit: '4px',
    borderRadius: '8px',
  },
  rules: {
    '.Tab': {
      border: '1px solid #E5E7EB',
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    },
    '.Tab:hover': {
      color: '#4F46E5',
    },
    '.Tab--selected': {
      borderColor: '#4F46E5',
      color: '#4F46E5',
    },
    '.Input': {
      border: '1px solid #E5E7EB',
      boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
    },
    '.Input:focus': {
      border: '1px solid #4F46E5',
      boxShadow: '0px 1px 3px rgba(79, 70, 229, 0.2)',
    },
    '.Label': {
      fontWeight: '500',
    },
    '.Error': {
      color: '#dc2626',
    },
  },
};
