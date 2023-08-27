export class CrawledData {
  constructor(
    public url: string,
    public pageTitle: string,
    public wordCount: number,
    public timestamp: number,
  ) {}
}
