import {makeObservable, observable} from "mobx";

export default class JonaStore {
    brothers = ["Lukas", "Jonatan"];

    constructor() {
        makeObservable(this, {
            brothers : observable,
        })
    }
}