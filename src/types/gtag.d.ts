interface Window {
  gtag: (
    command: 'config' | 'event',
    targetId: string,
    config?: {
      [key: string]: any;
      page_path?: string;
      page_title?: string;
      event_category?: string;
      event_label?: string;
      value?: number;
    }
  ) => void;
}

declare function gtag(
  command: 'config' | 'event',
  targetId: string,
  config?: {
    [key: string]: any;
    page_path?: string;
    page_title?: string;
    event_category?: string;
    event_label?: string;
    value?: number;
  }
): void; 