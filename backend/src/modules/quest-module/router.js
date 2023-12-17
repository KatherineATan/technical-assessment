import express from 'express';
import { QuestsDB } from '../../database/QuestsDB.js';
import { Quest } from '../../types/Quest.js';

/**
 * Returns the Quests Module express router
 * 
 * @returns {express.Router} The quests module express router
 */
export function questsRouter() {
    const router = express.Router();

    // TODO: Task 1
    // Get all quests associated with a hero
    router.get('/heroes/:id/quests', (req, res) => {
        const hero_id = req.params.hero_id;
        const quests = QuestsDB.getInstance().getQuests(hero_id);
    
        // Return 404 if hero not found, else return quests for the hero
        if (!hero) {
            res.sendStatus(404);
        } else {
            res.send(quests);
            res.sendStatus(200);
        }
    });

    // Gets a single quest by id
    router.get('/heroes/:hero_id/quests/:quest_id', (req, res) => {
        const quest_id = req.params.id;
        const quest = QuestsDB.getInstance().getQuest(quest_id);

        // Return 404 if quest or hero not found, else return quest
        if (!quest || !hero) {
            res.sendStatus(404);
        } else {
            res.send(quest);
            res.sendStatus(200);
        }
    });

    // TODO: Task 2
    // Creates a quest associated with a hero
    router.post('/heroes/:id/quests', (req, res) => {
        const body = req.body;
        const quest = new Quest(body);

        // Return 404 if hero not found, else add quest to database
        if (!hero) {
            res.sendStatus(404);
        } else {
            QuestsDB.getInstance().createQuest(quest);
            res.sendStatus(201);
        }
    });

    // TODO: Task 3
    router.patch('/heroes/:hero_id/quests/:quest_id', (req, res) => {
        const id = req.params.id;
        const body = req.body;
        const quest = QuestsDB.getInstance().getQuest(id);

        const route_hero_id = req.params.hero_id;
        const quest_hero_id = quest.hero_id;

        if (!quest || !hero) {
            res.sendStatus(404);
        } 
        // TODO is this the right not equals comparision for the id type
        else if (route_hero_id != quest_hero_id) {
            res.sendStatus(400);
        } else {
            QuestsDB.getInstance().updateQuest(id, body);
            res.sendStatus(204);
        }
    });

    // TODO: Task 4
    router.delete('/heroes/:hero_id/quests/:quest_id', (req, res) => {
        const id = req.params.id;
        const quest = QuestsDB.getInstance().getQuest(id);

        const route_hero_id = req.params.hero_id;
        const quest_hero_id = quest.hero_id;

        if (!quest || !hero) {
            res.sendStatus(404);
        } 
        // TODO is this the right not equals comparision for the id type
        else if (route_hero_id != quest_hero_id) {
            res.sendStatus(400);
        } else {
            QuestsDB.getInstance().deleteQuest(id);
            res.sendStatus(204);
        }
    });

    return router;
}