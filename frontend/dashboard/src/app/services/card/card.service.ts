import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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
  private cardUrl = environment.apiUrl + '/card';

  constructor(private http: HttpClient) { }

  getCard(id: number): Observable<Card> {
    return this.http.get<Card>(this.cardUrl + "/" + id.toString()).pipe(
      catchError(this.handleError<Card>(`getCard id=${id}`, {} as Card))
    ); 
  }

  createCard(payload: any): Observable<Card> {
    return this.http.post<Card>(this.cardUrl, payload).pipe(
      catchError(this.handleError<Card>(`createCard`, {} as Card))
    );
  }

  editCard(id: number, payload: any): Observable<Card> {
    return this.http.put<Card>(this.cardUrl + "/" + id.toString() + "/content", payload).pipe(
      catchError(this.handleError<Card>(`editCard id=${id}`, {} as Card))
    );
  }

  moveCard(id: number, payload: any): Observable<Card> {
    return this.http.put<Card>(this.cardUrl + "/" + id.toString() + "/move", payload).pipe(
      catchError(this.handleError<Card>(`moveCard id=${id}`, {} as Card))
    );
  }

  deleteCard(id: number, payload: any): Observable<Card> {
    const options = { 
      body: payload 
    };
    return this.http.delete<Card>(this.cardUrl + "/" + id.toString(), options).pipe(
      catchError(this.handleError<Card>(`deleteCard id=${id}`, {} as Card))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }; 
  }
}
