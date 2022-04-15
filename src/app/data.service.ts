import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  gifs = new BehaviorSubject<any>([]);


  constructor(private http: HttpClient) { }

  getTrendingGifs(){
    return this.http.get(`https://api.giphy.com/v1/gifs/trending?api_key=${environment.giphyApiKey}&limit=50`)
    .subscribe((response: any) =>{
      this.gifs.next(response.data);
    });
  }
  searchGifs(gifname :string){
    return this.http.get(`https://api.giphy.com/v1/gifs/search?q=${gifname}&api_key=${environment.giphyApiKey}&limit=50`)
    .subscribe((response: any) =>{
      this.gifs.next(response.data);
    });
  }
  getGifs(){
    return this.gifs.asObservable();
  }
}
