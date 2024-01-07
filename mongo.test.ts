import { Mongo } from './mongo.ts';
import { assertEquals } from '$std/assert/assert_equals.ts';

Deno.test('Mongo', async (t) => {
    const mongo = new Mongo(
        Deno.env.get('MONGO_END_POINT')!,
        Deno.env.get('MONGO_API_KEY')!,
        {
            "dataSource": "Cluster0",
            "database": "test",
            "collection": "test"
        }
    );
    let id1: string;
    await t.step('insertOne', async () => {
        const d: Record<string, unknown> = { name: 'test1', status: 'complete', created: Date.now() };
        id1 = await mongo.insertOne(d) as string;
        assertEquals(typeof id1, 'string');
    });
    await t.step('updateOne', async () => {
        const z = await mongo.updateOne({_id: { $oid: id1}}, { name: 'new-test1' });
        assertEquals(z, 1);
    });
    await t.step('replaceOne', async () => {
        const z = await mongo.replaceOne({_id: {$oid: id1}}, { aaa: 'nothing' });
        assertEquals(z, 1);
    });
    await t.step('findOne', async () => {
        const z = await mongo.findOne({_id: {$oid: id1}}) as Record<string, unknown>;
        assertEquals(z.aaa, 'nothing');
        assertEquals(z.name, undefined);
    });
    await t.step('deleteOne', async () => {
        const z = await mongo.deleteOne({_id: {$oid: id1}});
        assertEquals(z, 1);
    });
    await t.step('insertMany', async () => {
        const ds: Array<Record<string, unknown>> = [
            { name: 'test2', status: 'pending', created: Date.now() },
            { name: 'test3', status: 'pending', created: Date.now() }
        ];
        const [id2] = await mongo.insertMany(ds);
        assertEquals(typeof id2, 'string');
    });
    await t.step('updateMany', async () => {
        const z = await mongo.updateMany({ status: 'pending' }, { status: 'todo' });
        assertEquals(z, 2);
    });
    await t.step('find', async () => {
        const z = await mongo.find({ status: 'todo' });
        assertEquals(z.length, 2);
    });
    await t.step('deleteMany', async () => {
        const z = await mongo.deleteMany({ status: 'todo' });
        assertEquals(z, 2);
    });
})