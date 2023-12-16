import { v4 as uuid } from 'uuid';

export class Quest {
    /**
     * Creates a new quest object
     * 
     * @param {*} args A object containing quest properties
     */
    constructor(args) {
        this.id = uuid();
        this.name = args.name || 'Quest 1';
        this.description = args.description || 'Introduction quest';
        this.hero_id = args.hero ? args.hero.id : '0';
    }

    /**
     * Updates the quest class with new update values
     * 
     * @param {Partial<Quest>} args The partial quest object
     */
    updateQuest(args) {
        if (args.name) {
            this.name = args.name;
        }
        if (args.description) {
            this.description = args.description;
        }
        if (args.hero_id) {
            this.hero_id = args.hero_id;
        }
    }
}