import { CreateCrawledData } from './app/crawled-data/create-crawled-data.js';
import { GetCrawledData } from './app/crawled-data/get-crawled-data.js';
import { UpdateCrawledData } from './app/crawled-data/update-crawled-data.js';
import { CrawledDataRepository } from './infra/repositories/crawled-data/crawled-data.repository.js';
import { CrawledDataResolver } from './infra/graph-ql/crawled-data/crawled-data.resolver.js';
import { DynamoDBWrapper } from './infra/dynamo-db/dynamo-db.wrapper.js';
import { CrawledDataRecord } from './domain/types/crawled-data.type.js';

const dynamoDBWrapper = new DynamoDBWrapper<CrawledDataRecord>();

const crawledDataRepository = new CrawledDataRepository(dynamoDBWrapper);
const createCrawledData = new CreateCrawledData(crawledDataRepository);
const getCrawledData = new GetCrawledData(crawledDataRepository);
const updateCrawledData = new UpdateCrawledData(crawledDataRepository);

export const crawledDataResolversInstance = new CrawledDataResolver(
  createCrawledData,
  updateCrawledData,
  getCrawledData,
);
