export class CrawledData {
  constructor(
    public url: string,
    public timestamp: number,
    public pageTitle: string,
    public wordCount: number,
  ) {}
}
