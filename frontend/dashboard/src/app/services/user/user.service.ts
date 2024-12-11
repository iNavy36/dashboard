import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Observable, of } from 'rxjs'; 
import { catchError } from 'rxjs/operators'; 
import { environment } from '../../../environments/environment';

export interface User { 
  id: number; 
  name: string;
  isAdmin: boolean; 
} 

@Injectable({ providedIn: 'root' }) 
export class UserService { 
  private usersUrl = environment.apiUrl + '/users'; // Update with your backend URL, TODO: staviti loclhost link prije /users u dotenv
  constructor(private http: HttpClient) {} 
  
  getUsers(): Observable<User[]> { 
    return this.http.get<User[]>(this.usersUrl).pipe( 
      catchError(this.handleError<User[]>('getUsers', [])) 
    ); 
  } 
  
  private handleError<T>(operation = 'operation', result?: T) { 
    return (error: any): Observable<T> => { 
      console.error(`${operation} failed: ${error.message}`); 
      return of(result as T); 
    }; 
  } 
}
