import { CrawledDataRepository } from '../../infra/repositories/crawled-data/crawled-data.repository.js';
import { CrawledDataRecord } from '../../domain/types/crawled-data.type.js';

export class CreateCrawledData {
  constructor(private crawledDataRepository: CrawledDataRepository) {}

  execute(crawledData: CrawledDataRecord): Promise<void> {
    return this.crawledDataRepository.insert(crawledData);
  }
}
