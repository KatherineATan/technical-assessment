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

    /**
     * Gets a quest for a hero with a hero id
     * 
     * @param {string} hero_id 
     * @returns {Quest[]} An array of quests for the hero with the specified id
     */
    getQuests(hero_id) {
        return this.quests.filter(quest => quest.hero_id === hero_id);
    }

    /**
     * Gets a quest with a specified id
     * 
     * @param {string} id 
     * @returns {Quest} A quest with the specified id
     */
    getQuest(id) {
        return this.quests.find(quest => quest.id === id);
    }

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
        this.createQuest(quest);
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