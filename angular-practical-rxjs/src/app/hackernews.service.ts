import { Injectable } from '@angular/core';
import { Observable, of, from, forkJoin } from 'rxjs';
import { tap, catchError, mergeMap, concatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { PostItem } from './types/post-item';
import { MessageService } from './message.service';

const LIMIT_ITEMS = 10;

@Injectable({
  providedIn: 'root'
})
export class HackernewsService {
  private apiUrl = 'https://hacker-news.firebaseio.com/v0';
  postIds: number[] = [];

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  /** Log a HomeService message with the MessageService */
  private log(message: string) {
    this.messageService.add('HomeService: ' + message);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPostIds() {
    return this.postIds;
  }

  setPostIds(ids: number[]) {
    this.postIds = ids;
  }

  getListPosts(): Observable<PostItem> {
    return this.getIds()
      .pipe(
        mergeMap((ids: number[]) => this.getPostItems(ids.slice(0, LIMIT_ITEMS))),
      )
  }

  getListPostsSequence(): Observable<PostItem> {
    return this.getIds()
      .pipe(
        concatMap((ids: number[]) => this.getPostItemsConcat(ids.slice(0, LIMIT_ITEMS))),
      )
  }

  getListPostsForkJoin(): Observable<PostItem[]> {
    return this.getIds()
      .pipe(
        mergeMap((ids: number[]) => {
          let listIds = ids.slice(0, LIMIT_ITEMS);
          return forkJoin(...listIds.map(id => <Observable<PostItem>> this.http.get<PostItem>(`${this.apiUrl}/item/${id}.json`)));
        }),
      )
  }

  private getIds(): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/topstories.json`)
      .pipe(
        tap((ids: number[]) => this.setPostIds(ids)),
        tap(_ => this.log(`getIds`)),
        catchError(this.handleError(`getIds`, []))
      )
  }

  private getPostItems(ids: number[]): Observable<PostItem> {
    return from(ids).pipe(
      mergeMap(id => <Observable<PostItem>> this.http.get<PostItem>(`${this.apiUrl}/item/${id}.json`))
    )
  }

  private getPostItemsConcat(ids: number[]): Observable<PostItem> {
    return from(ids).pipe(
      concatMap(id => <Observable<PostItem>> this.http.get<PostItem>(`${this.apiUrl}/item/${id}.json`))
    )
  }
}
