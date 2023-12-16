import { supertestSetup } from "../../test/SupertestSetup";

// Quest module already initialized in function so no need to send
// router function
const request = supertestSetup(undefined);
let ID = '';

describe('Quest Module', () => {
    beforeAll(async () => {
        // Get a quest id to use for getting/updating/deleting
        await request.post('/quests')
            .send({
                name: 'Quest 2',
                description: 'Intro 2',
                hero_id: '2', // TODO how to get hero id?
            });
        const res = await request.get('/quests');
        ID = res.body[0].id;
    });

    // TODO look over this get from hero_id
    describe('GET /quests/:hero_id', () => {
        it('should return a 200 for all quests for a found hero', done => {
            request.get(`/quests/${hero_id}`)
                .expect(200, done);
        });
        it('should return a 404 for not found hero', done => {
            request.get('/quests/abc')
                .expect(404, done);
        });
    });
    // TODO is this get needed?
    describe('GET /quests/:id', () => {
        it('should return a 200 for a found quest', done => {
            request.get(`/quests/${quest_id}`)
                .expect(200, done);
        });
        it('should return a 404 for not found quest', done => {
            request.get('/quests/abc')
                .expect(404, done);
        });
    });

    // TODO does the hero_id have to be passed in?
    describe('POST /quests/:hero_id', () => {
        it('should return a 201 for complete quest with a found hero', done => {
            request.post(`/quests/${hero_id}`)
                .send({
                    name: 'Quest 3',
                    description: 'Intro 3',
                })
                .expect(201, done);
        });
        it('should return a 404 for a not found hero', done => {
            request.post('/quests/abc')
                .expect(404, done);
        });
    });

    // TODO probably have to pass in both hero_id and quest_id
    describe(`PATCH /quests/:id`, () => {
        it('should return a 204 for a updated quest', done => {
            request.patch(`/quests/${ID}`)
                .send({
                    description: 'Defeat the dragon'
                })
                .expect(204, done);
        });
        it('should return a 400 when the route hero_id does not match the quests hero_id in database', done => {
            request.patch(`/quests/abc`)
                .send({
                    description: 'The last quest p1'
                })
                .expect(400, done);
        });
        it('should return a 404 for a not found hero or quest for the given ids', done => {
            request.patch(`/quests/abc`)
                .send({
                    description: 'The last quest p2'
                })
                .expect(404, done);
        });
    });

    // TODO probably have to pass in both hero_id and quest_id
    describe('DELETE /quests/:id', () => {
        it('should return a 204 for a deleted quest', done => {
            request.delete(`/quests/${ID}`)
                .expect(204, done);
        });
        it('should return a 400 when the route hero_id does not match the quests hero_id in database', done => {
            request.delete(`/quests/${ID}`)
                .expect(400, done);
        });
        it('should return a 404 for a not found hero or quest for the given ids', done => {
            request.delete(`/quests/${ID}`)
                .expect(404, done);
        });
    });
});
