import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Card {
  cardId: number,
  content: string,
  userId: number,
  listId: number
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardUrl = 'http://localhost:8080/card';

  constructor(private http: HttpClient) { }

  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(this.cardUrl + "/" + id.toString()).pipe(
      catchError(this.handleError<Card>(`getCard id=${id}`))
    ); 
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }; 
  }
}
