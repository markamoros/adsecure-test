import { CreateCrawledData } from '../../../app/crawled-data/create-crawled-data.js';
import { GetCrawledData } from '../../../app/crawled-data/get-crawled-data.js';
import { UpdateCrawledData } from '../../../app/crawled-data/update-crawled-data.js';

export class CrawledDataResolver {
  constructor(
    private readonly createCrawledData: CreateCrawledData,
    private readonly updateCrawledData: UpdateCrawledData,
    private readonly getCrawledData: GetCrawledData,
  ) {}

  Query = {
    getCrawledData: async (_, { filters, fields, limit, offset }) => {
      return await this.getCrawledData.execute(
        filters,
        fields,
        limit,
        offset,
      );
    },
  };

  Mutation = {
    addCrawledData: async (_, { input }) => {
      return await this.createCrawledData.execute(input);
    },
    updateCrawledData: async (_, { id, input }) => {
      return await this.updateCrawledData.execute(id, input);
    },
  };
}
