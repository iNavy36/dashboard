import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of } from 'rxjs'; 
import { catchError } from 'rxjs/operators'; 
import { environment } from '../../../environments/environment';

export interface Board { 
  id: number; 
  name: string; 
  adminId: number; 
  listsId: number[]; 
}

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private boardUrl = environment.apiUrl + '/board';
  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(this.boardUrl).pipe(
      catchError(this.handleError<Board[]>('getBoards', []))
    ); 
  }

  getBoard(id: number): Observable<Board> {
    return this.http.get<Board>(this.boardUrl + "/" + id).pipe(
      catchError(this.handleError<Board>('getBoard', {} as Board))
    ); 
  }

  createBoard(payload: any): Observable<Board> {
    return this.http.post<Board>(this.boardUrl, payload).pipe(
      catchError(this.handleError<Board>(`createBoard`, {} as Board))
    );
  }

  updateBoard(id: number, payload: any): Observable<Board> {
    return this.http.put<Board>(this.boardUrl + "/" + id.toString(), payload).pipe(
      catchError(this.handleError<Board>(`updateBoard id=${id}`, {} as Board))
    );
  }

  deleteBoard(id: number, payload: any): Observable<Board> {
    const options = { 
      body: payload 
    };
    return this.http.delete<Board>(this.boardUrl + "/" + id.toString(), options).pipe(
      catchError(this.handleError<Board>(`deleteBoard id=${id}`, {} as Board))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }; 
  }
}
