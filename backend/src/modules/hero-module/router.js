import express from 'express';
import { HeroesDB } from '../../database/HeroesDB.js';
import { Hero } from '../../types/Hero.js';

export function heroesRouter() {
    const router = express.Router();

    /**
     * Gets all hereos
     */
    router.get('/', (req, res) => {
        res.send(HeroesDB.getInstance().getHeroes());
    });

    /**
     * Gets a single hero by id
     */
    router.get('/:id', (req, res) => {
        const id = req.params.id;
        const hero = HeroesDB.getInstance().getHero(id);

        // Return 404 if not found, else return hero object
        if (!hero) {
            res.sendStatus(404);
        } else {
            res.send(hero);
        }
    });

    /**
     * Creates a hero
     */
    router.post('/', (req, res) => {
        const body = req.body;
        const hero = new Hero(body);
        HeroesDB.getInstance().createHero(hero);
        res.sendStatus(201);
    });

    /**
     * Updates a hero by id
     */
    router.patch('/:id', (req, res) => {
        const id = req.params.id;
        const body = req.body;

        const hero = HeroesDB.getInstance().getHero(id);
        if (!hero) {
            res.sendStatus(404);
        } else {
            HeroesDB.getInstance().updateHero(id, body);
            res.sendStatus(204);
        }
    });

    /**
     * Deletes a hero by id
     */
    router.delete('/:id', (req, res) => {
        const id = req.params.id;

        const hero = HeroesDB.getInstance().getHero(id);
        if (!hero) {
            res.sendStatus(404);
        } else {
            HeroesDB.getInstance().deleteHero(id);
            res.sendStatus(204);
        }
    });

    return router;
}