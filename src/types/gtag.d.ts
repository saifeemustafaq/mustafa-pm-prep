interface Window {
  gtag: (
    command: 'config' | 'event',
    targetId: string,
    config?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    [key: string]: string | number | boolean | undefined;
    page_path?: string;
    page_title?: string;
    event_category?: string;
    event_label?: string;
    value?: number;
  }
): void; 