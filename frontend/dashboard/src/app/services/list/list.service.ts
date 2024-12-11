import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

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
  
  createList(payload: any): Observable<List> {
    return this.http.post<List>(this.listUrl, payload).pipe(
      catchError(this.handleError<List>(`createList`, {} as List))
    );
  }

  updateList(id: number, payload: any): Observable<List> {
    return this.http.put<List>(this.listUrl + "/" + id.toString(), payload).pipe(
      catchError(this.handleError<List>(`updateList id=${id}`, {} as List))
    );
  }

  deleteList(id: number, payload: any): Observable<List> {
    const options = { 
      body: payload 
    };
    return this.http.delete<List>(this.listUrl + "/" + id.toString(), options).pipe(
      catchError(this.handleError<List>(`deleteList id=${id}`, {} as List))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }; 
  }
}
