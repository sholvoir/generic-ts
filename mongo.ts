export interface IDataSource {
    dataSource: string,
    database: string,
    collection: string
}

export class Mongo {
    #reqInit: RequestInit;
    constructor(private endpoint: string, apiKey: string, private dataSource: IDataSource) {
        this.#reqInit = {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "Access-Control-Request-Headers": "*",
                "api-key": apiKey
            })
        };
    }
    async act(action: string, body: Record<string, unknown>) {
        const reqInit = { ...this.#reqInit, body: JSON.stringify({ ...this.dataSource, ...body }) };
        const res = await fetch(`${this.endpoint}/${action}`, reqInit);
        if (res.ok) return await res.json();
        throw new Error(`Code: ${res.status}, ${await res.text()}`);
    }
    
    async findOne(filter: Record<string, unknown>) {
        return (await this.act('data/v1/action/findOne', { filter })).document;
    }
    
    async find(filter: Record<string, unknown>) {
        return (await this.act('data/v1/action/find', { filter })).documents as Array<unknown>;
    }
    
    async insertOne(document: Record<string, unknown>) {
        return (await this.act('data/v1/action/insertOne', { document })).insertedId as string;
    }
    
    async insertMany(documents: Array<Record<string, unknown>>) {
        return (await this.act('data/v1/action/insertMany', { documents })).insertedIds as Array<string>;
    }
    
    async updateOne(filter: Record<string, unknown>, document: Record<string, unknown>) {
        if (document._id) delete document._id;
        return (await this.act('data/v1/action/updateOne', { filter, update: { "$set": document } })).modifiedCount as number;
    }
    
    async updateMany(filter: Record<string, unknown>, document: Record<string, unknown>) {
        if (document._id) delete document._id;
        return (await this.act('data/v1/action/updateMany', { filter, update: { "$set": document } })).modifiedCount as number;
    }
    
    async replaceOne(filter: Record<string, unknown>, replacement: Record<string, unknown>) {
        if (replacement._id) delete replacement._id;
        return (await this.act('data/v1/action/replaceOne', { filter, replacement })).modifiedCount as number;
    }
    
    async deleteOne(filter: Record<string, unknown>) {
        return (await this.act('data/v1/action/deleteOne', { filter })).deletedCount as number;
    }
    
    async deleteMany(filter: Record<string, unknown>) {
        return (await this.act('data/v1/action/deleteMany', { filter })).deletedCount as number;
    }
}