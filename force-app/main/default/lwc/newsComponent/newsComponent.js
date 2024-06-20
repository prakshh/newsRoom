import { LightningElement, track } from 'lwc';
import retrieveNews from "@salesforce/apex/NewsController.retrieveNews";

export default class NewsComponent extends LightningElement {
    @track result = []
    connectedCallback() {
        this.fetchNews();
    }
    fetchNews() {
        retrieveNews().then(response=>{
            console.log(response);
            this.formatNewsData(response.articles);
        }).catch(error=>{
            console.error(error);
        })
    }
    formatNewsData(res) {
        this.result = res.map((item, index)=>{
            let id = `new_${index+1}`;
            let name = item.source.name;
            return {...item, id:id, name:name}
        })
    }
}