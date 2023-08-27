import {DynamoDBWrapper} from "./infra/dynamoDB/dynamo-db.wrapper.js";
import {CrawledDataService} from "./app/services/crawled-data.service.js";
import {CrawledDataRecord} from "./domain/types/crawled-data.type.js";

const dynamoDBWrapper = new DynamoDBWrapper<CrawledDataRecord>();
const crawledDataService = new CrawledDataService(dynamoDBWrapper);

const url = 'https://random.io';
const crawledData: CrawledDataRecord = {
  url,
  pageTitle: 'Random IO',
  wordCount: 5000,
  timestamp: new Date().getTime(),
};

const exercise2 = async () => {
  try {
    await crawledDataService.insert(crawledData);
    await crawledDataService.queryByUrl(url);
  } catch (e) {
    console.log("Error:", e);
  }
}
