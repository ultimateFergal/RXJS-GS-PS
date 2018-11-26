import { Observable, Subscriber, of, from, fromEvent, concat, interval } from 'rxjs';
import { map, mergeMap, filter, tap, catchError } from 'rxjs/operators';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { allBooks, allReaders } from "./data";


// OPERATORS

//#region OPERATORS

let source$: any = of(1, 2, 3, 4, 5);

// let doubler: any = map((value: any) => value * 2);// return function that takes an observable as a parameter and returns a new observable

// let doubled: any = doubler(source$);

// doubled.subscribe(
//     value => console.log(value) // 2, 4, 6 , 8 , 10
// )

// Old sintax
// source$
//     .map(value => value * 2)
//     .filter(mappedValue => mappedValue > 5)
//     .subscribe(
//         finalValue => console.log(finalValue)
//     ); // 6, 8 , 10
//

// New Syntax -   Comma separated methods i want to chain togeteher
source$.pipe(
    map((value: any) => value * 2),
    filter(mappedValue => mappedValue > 5)
)
    .subscribe(
        finalValue => console.log(finalValue)
        // 6, 8 , 10
    )



ajax('/api/books')
ajax('/api/errors/500') // To simulate an error
    .pipe(
        mergeMap(ajaxresponse => ajaxresponse.response), // Maps one value to another and then flattens the result // Will get me each book as a distinct value
        filter(book => book.publicationYear  < 1950),
        tap(oldBook => console.log(`Title: ${oldBook.title}`)), // Will always return an observable that produces the same values as the source observable with a convenient place to execute
        catchError( err => of ({title: 'Corduroy', author: 'Don Freeman'})), // WIll terturn this created observable if error from the server
        // catchError( (err, caught) => caught) // return this observable


    ) 
    .subscribe(
        // finalValue => console.log(finalValue)
        finalValue => console.log(`VALUE: ${finalValue.title}`),
        error => console.log(`ERROR: ${error}`)
    );
//#endregion    