import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable, of } from 'rxjs'; 
import { catchError } from 'rxjs/operators'; 

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
  private boardUrl = 'http://localhost:8080/board'; // Update with your backend URL, TODO: staviti loclhost link prije /users u dotenv
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    }; 
  }
}
