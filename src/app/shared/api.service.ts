import { Iusers } from './../interfaces/iusers';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public url: string = 'API_URL'
  private usersUrl = 'assets/users.json';

  user: Iusers = {
    id: 0,
    email: '',
    name: '',
    surname: '',
    surname2: ''

  }

  constructor(private http:HttpClient) { }

  //Éste sería el código para realiazar el GET a la API (si esta existiera). Por el contrario, he creado un archivo Json en el directorio assets (users.json), y lo he asignado
  // a la respuesta que devuelve la función getUsers().

  
  // getUsers () {
  //   return this.http.get(this.url)
  // }

  getUsers(): Observable<Iusers[]> {
    return this.http.get<{ usuarios: Iusers[] }>(this.usersUrl).pipe(
      map(response => response.usuarios)
    );
  }
  
}
