import express from 'express';
import { QuestsDB } from '../../database/QuestsDB.js';
import { Quest } from '../../types/Quest.js';

export function questsRouter() {
    const router = express.Router();

    // TODO: Task 1
    // TODO finish

    // TODO: Task 2
    // TODO look over, add what happens if heroid not found
    router.post('/quests', (req, res) => {
        const body = req.body;
        const quest = new Quest(body);
        QuestsDB.getInstance().createQuest(quest);
        res.sendStatus(201);
    });

    // TODO: Task 3
    router.patch('/quests/:id', (req, res) => {
        const id = req.params.id;
        const body = req.body;

        const quest = QuestsDB.getInstance().getQuest(id);
        if (!quest) {
            res.sendStatus(404);
        } 
        // TODO add else if for status 400
        else {
            QuestsDB.getInstance().updateQuest(id, body);
            res.sendStatus(204);
        }
    });

    // TODO: Task 4
    router.delete('/quests/:id', (req, res) => {
        const id = req.params.id;

        const quest = QuestsDB.getInstance().getQuest(id);
        if (!quest) {
            res.sendStatus(404);
        } 
        // TODO add else if for status 400
        else {
            QuestsDB.getInstance().deleteQuest(id);
            res.sendStatus(204);
        }
    });

    return router;
}