import { type MongoClientOptions, MongoClient, ServerApiVersion } from 'mongodb';

const options = {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
} as MongoClientOptions;

export async function mongoRun<T>(uri: string, func: (client: MongoClient) => Promise<T>): Promise<T> {
    const client = new MongoClient(uri, options);
    await client.connect();
    const result = await func(client);
    await client.close();
    return result;
}