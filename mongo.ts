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
                apiKey
            })
        };
    }
    async #act<S extends IDataSource>(action: string, body: S) {
        this.#reqInit.body = JSON.stringify(body);
        const res = await fetch(`${this.endpoint}/action/${action}`, this.#reqInit);
        if (res.ok) return await res.json();
        throw new Error(`Error: ${res.statusText}`);
    }
    
    async findOne(filter: Record<string, unknown>) {
        return (await this.#act('findOne', { ...this.dataSource, filter })).document;
    }
    
    async find(filter: Record<string, unknown>) {
        return (await this.#act('find', { ...this.dataSource, filter })).documents as Array<unknown>;
    }
    
    async insertOne(document: Record<string, unknown>) {
        return (await this.#act('insertOne', { ...this.dataSource, document })).insertedId as string;
    }
    
    async insertMany(documents: Array<Record<string, unknown>>) {
        return (await this.#act('insertMany', { ...this.dataSource, documents })).insertedIds as Array<string>;
    }
    
    async updateOne(filter: Record<string, unknown>, document: Record<string, unknown>) {
        if (document._id) delete document._id;
        return (await this.#act('updateOne', { ...this.dataSource, filter, update: { "$set": document } })).modifiedCount as number;
    }
    
    async updateMany(filter: Record<string, unknown>, document: Record<string, unknown>) {
        if (document._id) delete document._id;
        return (await this.#act('updateMany', { ...this.dataSource, filter, update: { "$set": document } })).modifiedCount as number;
    }
    
    async replaceOne(filter: Record<string, unknown>, replacement: Record<string, unknown>) {
        if (replacement._id) delete replacement._id;
        return (await this.#act('replaceOne', { ...this.dataSource, filter, replacement })).modifiedCount as number;
    }
    
    async deleteOne(filter: Record<string, unknown>) {
        return (await this.#act('deleteOne', { ...this.dataSource, filter })).deletedCount as number;
    }
    
    async deleteMany(filter: Record<string, unknown>) {
        return (await this.#act('deleteMany', { ...this.dataSource, filter })).deletedCount as number;
    }
}