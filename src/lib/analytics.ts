export const GA_MEASUREMENT_ID = 'G-8E85J5EKYP';

export const pageview = (url: string) => {
  window.gtag('config', GA_MEASUREMENT_ID, {
    page_path: url,
  });
};

export const event = ({ 
  action, 
  category, 
  label, 
  value 
}: { 
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
}; 