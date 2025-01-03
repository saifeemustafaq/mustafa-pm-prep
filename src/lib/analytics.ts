import { GA_TRACKING_ID } from './constants'

// Log a page view
export const pageview = (url: string) => {
  console.log('Sending pageview:', url);  // Debug log
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  })
}

// Log a specific event
export const event = ({ action, category, label, value }: {
  action: string
  category: string
  label: string
  value?: number
}) => {
  console.log('Sending event:', { action, category, label, value });  // Debug log
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  })
} 