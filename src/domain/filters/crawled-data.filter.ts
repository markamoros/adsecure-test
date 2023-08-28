export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface NumRange {
  min: number;
  max: number;
}

export interface CrawledDataFilter {
  id?: string;
  url?: string;
  pageTitle?: string;
  wordCountRange?: NumRange;
  dateRange?: DateRange;
}
