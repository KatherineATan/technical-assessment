import { Quest } from "../types/Quest.js";

export class QuestsDB {
    static instance = undefined;
    quests = []; // Database array

    /**
     * Gets an instance of the database
     * 
     * @returns {QuestsDB} An instance of QuestsDB
     */
    static getInstance() {
        if (!this.instance) {
            this.instance = new QuestsDB();
        }
        return this.instance;
    }

    // TODO change the get commands to get quests for a hero_id

    /**
     * Gets all the heroes in the database
     * 
     * @returns {Hero[]} An array of heroes
     */
    getHeroes() {
        return this.heroes;
    }

    /**
     * Gets a hero with a specific id
     * 
     * @param {string} id 
     * @returns {Hero} A hero with the specified id
     */
    getHero(id) {
        return this.heroes.find(hero => hero.id === id);
    }


    // TODO attach it to a quest
    /**
     * Adds a quest to the database
     * 
     * @param {Quest} quest The quest to add to the database
     */
    createQuest(quest) {
        this.quests.push(quest);
    }

    /**
     * Updates a quest by id in the database
     * 
     * @param {string} id The id of the quest to update
     * @param {Partial<Quest>} questUpdates A partial quest object
     */
    updateQuest(id, questUpdates) {
        const quest = this.getQuest(id);
        this.deleteQuest(id);
        quest.updateQuest(questUpdates);
        this.createQuests(quest);
    }

    /**
     * Deletes a quest by id in the database
     * 
     * @param {string} id The id of the quest to delete
     */
    deleteQuest(id) {
        const index = this.quests.findIndex(quest => quest.id === id);
        if (index >= 0) {
            this.quests.splice(index, 1);
        }
    }
}