import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Alunos as Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {

  url = 'http://localhost:8100/folder/alunos'; 

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  // Obtem todos os Alunos
  getAlunos(): Observable<Aluno[]> {
    return this.httpClient.get<Aluno[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  // Obtem um Aluno pelo id
  getAlunoById(id: number): Observable<Aluno> {
    return this.httpClient.get<Aluno>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // salva um Aluno
  saveAluno(aluno: Aluno): Observable<Aluno> {
    return this.httpClient.post<Aluno>(this.url, JSON.stringify(aluno), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // atualizar um aluno
  updateAluno(aluno: Aluno): Observable<Aluno> {
    return this.httpClient.put<Aluno>(this.url + '/' + aluno.id, JSON.stringify(aluno), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // deleta um aluno
  deleteAluno(aluno: Aluno) {
    return this.httpClient.delete<Aluno>(this.url + '/' + aluno.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}