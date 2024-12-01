import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface List { 
  listId: number; 
  name: string; 
  adminId: number; 
  boardId: number; 
  cardsId: number[]; 
}

@Injectable({
  providedIn: 'root'
})
export class ListService {
  private listUrl = environment.apiUrl + '/list';

  constructor(private http: HttpClient) { }

  getList(id: number): Observable<List> {
    return this.http.get<List>(this.listUrl + "/" + id.toString()).pipe(
      catchError(this.handleError<List>(`getList id=${id}`))
    ); 
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }; 
  }
}
