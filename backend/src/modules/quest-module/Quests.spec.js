import { supertestSetup } from "../../test/SupertestSetup";

// Quest module already initialized in function so no need to send
// router function
const request = supertestSetup(undefined);
let quest_id = '';
let hero_id = '';
let a_hero_id = '';

describe('Quest Module', () => {
    beforeAll(async () => {
        // Make a hero to use to make a quest
        await request.post('/heroes')
            .send({
                name: 'Shao',
                class: 'Teacher',
                level: 5,
            });
        const hero_res = await request.get('/heroes');
        a_hero_id = hero_res.body[0].id;

        // Get a quest id to use for getting/updating/deleting
        await request.post(`/heroes/${hero_id}/quests`)
            .send({
                name: 'Quest 2',
                description: 'Intro 2',
                hero_id: a_hero_id, 
            });
        const res = await request.get(`/heroes/${hero_id}/quests`);
        
        // testing
        console.log('Response body:', res.body);
        
        quest_id = res.body[0].id;
        hero_id = res.body[0].hero_id;
    });

    // Get all quests associated with a hero
    describe('GET /heroes/:hero_id/quests', () => {
        it('should return a 200 for all quests for a found hero', done => {
            request.get(`/heroes/${hero_id}/quests`)
                .expect(200, done);
        });
        it('should return a 404 for not found hero', done => {
            request.get('/heroes/abc/quests')
                .expect(404, done);
        });
    });

    // Creates a quest associated with a hero
    describe('POST /heroes/:hero_id/quests', () => {
        it('should return a 201 for complete quest with a found hero', done => {
            request.post(`/heroes/${hero_id}/quests`)
                .send({
                    name: 'Quest 3',
                    description: 'Intro 3',
                    hero_id: hero_id,
                })
                .expect(201, done);
        });
        it('should return a 404 for a not found hero', done => {
            request.post('/heroes/abc/quests')
                .expect(404, done);
        });
    });

    // Updates a quest
    describe(`PATCH /heroes/:hero_id/quests/:quest_id`, () => {
        it('should return a 204 for a updated quest', done => {
            request.patch(`/heroes/${hero_id}/quests/${quest_id}`)
                .send({
                    description: 'Defeat the dragon'
                })
                .expect(204, done);
        });
        it('should return a 400 when the route hero_id does not match the quest hero_id in database', done => {
            request.patch('/heroes/abc/quests/abc')
                .send({
                    description: 'The last quest p1'
                })
                .expect(400, done);
        });
        it('should return a 404 for a not found hero for the given ids', done => {
            request.patch(`/heroes/abc/quests/${quest_id}`)
                .send({
                    description: 'The last quest p2'
                })
                .expect(404, done);
        });
        it('should return a 404 for a not found quest for the given ids', done => {
            request.patch(`/heroes/${hero_id}/quests/abc`)
                .send({
                    description: 'The last quest p3'
                })
                .expect(404, done);
        });
    });

    // Deletes a quest
    describe('DELETE /heroes/:hero_id/quests/:quest_id', () => {
        it('should return a 204 for a deleted quest', done => {
            request.delete(`/heroes/${hero_id}/quests/${quest_id}`)
                .expect(204, done);
        });
        it('should return a 400 when the route hero_id does not match the quest hero_id in database', done => {
            request.delete(`/heroes/${hero_id}/quests/${quest_id}`)
                .expect(400, done);
        });
        it('should return a 404 for a not found hero for the given id', done => {
            request.delete(`/heroes/abc/quests/${quest_id}`)
                .expect(404, done);
        });
        it('should return a 404 for a not found quest for the given id', done => {
            request.delete(`/heroes/${hero_id}/quests/abc`)
                .expect(404, done);
        });
    });
});