import { CrawledDataRepository } from '../../infra/repositories/crawled-data/crawled-data.repository.js';
import { CrawledDataRecord } from '../../domain/types/crawled-data.type.js';

export class UpdateCrawledData {
  constructor(private crawledDataRepository: CrawledDataRepository) {}

  execute(id: string, newData: CrawledDataRecord): Promise<void> {
    return this.crawledDataRepository.update(id, newData);
  }
}
