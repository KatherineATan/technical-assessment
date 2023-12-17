import express from 'express';
import { QuestsDB } from '../../database/QuestsDB.js';
import { Quest } from '../../types/Quest.js';
import { HeroesDB } from '../../database/HeroesDB.js';

/**
 * Returns the Quests Module express router
 * 
 * @returns {express.Router} The quests module express router
 */
export function questsRouter() {
    const router = express.Router();

    // Get all quests associated with a hero
    router.get('/heroes/:hero_id/quests', (req, res) => {
        const hero_id = req.params.hero_id;
        const hero = HeroesDB.getInstance().getHero(hero_id);
    
        // Return 404 if hero not found, else return quests for the hero
        if (!hero) {
            res.sendStatus(404);
        } else {
            const quests = QuestsDB.getInstance().getQuests(hero_id);
            res.send(quests);
            res.sendStatus(200);
        }
    });

    // Creates a quest associated with a hero
    router.post('/heroes/:hero_id/quests', (req, res) => {
        const body = req.body;
        const hero_id = req.params.hero_id;
        const hero = HeroesDB.getInstance().getHero(hero_id);

        // Return 404 if hero not found, else add quest to database
        if (!hero) {
            res.sendStatus(404);
        } else {
            const quest = new Quest(body);
            QuestsDB.getInstance().createQuest(quest);
            res.sendStatus(201);
        }
    });

    // Updates a quest
    router.patch('/heroes/:hero_id/quests/:quest_id', (req, res) => {
        const quest_id = req.params.quest_id;
        const body = req.body;
        const quest = QuestsDB.getInstance().getQuest(quest_id);

        const route_hero_id = req.params.hero_id;
        const quest_hero_id = quest.hero_id;

        const hero = HeroesDB.getInstance().getHero(route_hero_id);

        if (!quest || !hero) {
            res.sendStatus(404);
        } 
        else if (route_hero_id !== quest_hero_id) {
            res.sendStatus(400);
        } else {
            QuestsDB.getInstance().updateQuest(quest_id, body);
            res.sendStatus(204);
        }
    });

    // Deletes a quest
    router.delete('/heroes/:hero_id/quests/:quest_id', (req, res) => {
        const quest_id = req.params.quest_id;
        const quest = QuestsDB.getInstance().getQuest(quest_id);

        const route_hero_id = req.params.hero_id;
        const quest_hero_id = quest.hero_id;

        const hero = HeroesDB.getInstance().getHero(route_hero_id);

        if (!quest || !hero) {
            res.sendStatus(404);
        } 
        else if (route_hero_id !== quest_hero_id) {
            res.sendStatus(400);
        } else {
            QuestsDB.getInstance().deleteQuest(quest_id);
            res.sendStatus(204);
        }
    });

    return router;
}