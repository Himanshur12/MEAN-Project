import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    token: 'my-auth-token'
  })
};
@Injectable({
  providedIn: 'root'
})
export class HeroService {
  
  constructor(private http: HttpClient) { }
  
getUser() :  Observable<any> {
    return this.http.get('http://localhost:3000/users')
 }
 getUserr(data) :  Observable<any> {
  httpOptions.headers = httpOptions.headers.set('token', data);
  return this.http.get('http://localhost:3000/users/user/token', httpOptions)
}

 getProduct() :  Observable<any> {
  return this.http.get('http://localhost:3000/products')
}
addUser(data) :  Observable<any> {
  return this.http.post('http://localhost:3000/users/register',data)
}
addProduct(data) :  Observable<any> {
  return this.http.post('http://localhost:3000/products/',data)
}
deleteUser(id) :  Observable<any> {
  return this.http.delete('http://localhost:3000/users/'+id)
}
deleteProduct(id) :  Observable<any> {
  return this.http.delete('http://localhost:3000/products/'+id)
}
updateUser(data) :  Observable<any> {
  return this.http.put<any>('http://localhost:3000/users/'+data._id,data)
}
updateProduct(data) :  Observable<any> {
  return this.http.put<any>('http://localhost:3000/products/'+data._id,data)
}


getUserById(id) :  Observable<any> {
  return this.http.get('http://localhost:3000/users/'+id)
}


loginUser(data) :  Observable<any> {
  return this.http.post('http://localhost:3000/users/login',data)
}

}
