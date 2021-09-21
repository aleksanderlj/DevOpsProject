import {makeObservable, observable, runInAction} from "mobx";

const baseUrl = process.env.NODE_ENV === 'development' ? "http://localhost:8080/":""; //Check if dev environment

class JonaStore {
    brothers = ["Lukas", "Jonatan"];
    status = "DONE";

    constructor() {
        makeObservable(this, {
            brothers : observable,
            status : observable,
        })
    }

    async fetchNames (){
        runInAction(() => this.status = "LOADING");
        try {
            const response = await fetch(baseUrl + "rest/test/names");
            const json = await response.json();
            runInAction(() => this.brothers = json);
            runInAction(() => this.status = "DONE");
        } catch (e) {
            runInAction(() => this.status = "FAILED");
            console.log(e);
            console.log(this.status);
        }
    }

    async addName(name){
        runInAction(() => this.status = "LOADING");
        try {
            const response = await fetch(baseUrl + "rest/test/names", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: name
            });
            runInAction(() => this.status = "DONE");
        } catch (e) {
            runInAction(() => this.status = "FAILED");
            console.log(e);
            console.log(this.status);
        }
    }
} export default JonaStore;