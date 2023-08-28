import { CrawledDataRepository } from '../../infra/repositories/crawled-data/crawled-data.repository.js';
import { CrawledData } from '../../domain/models/crawled-data.model.js';
import { CrawledDataFilter } from '../../domain/filters/crawled-data.filter.js';

export class GetCrawledData {
  constructor(private crawledDataRepository: CrawledDataRepository) {}

  execute(
    filter: CrawledDataFilter,
    fields: string[],
    limit?: number,
    offset?: number,
  ): Promise<CrawledData[]> {
    return this.crawledDataRepository.query(filter, fields, limit, offset);
  }
}
