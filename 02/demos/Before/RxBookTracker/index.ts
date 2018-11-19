//alert("Hello RxJS!");
import { Observable, Subscriber, of, from, fromEvent, concat } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { allBooks, allReaders } from "./data";

/**---------------First and most basic form----------------------- */
// This function defines what will happen when 
// the observable is executed
// function subscribe(subscriber) {
//     for (let book of allBooks) {
//         subscriber.next(book);      
//     }
// }
// let allBooksObservable$ = new Observable(subscribe);

/**---------------First and most basic form----------------------- */


// let allBooksObservable$ = new Observable(subscriber => {
let allBooksObservable$ = Observable.create(subscriber => { // Funciona igual que con new anterior

    // Three methods of the observable interface being used
    if (document.title !== 'RxBookTracker') {
        subscriber.error('Incorrect page title.');
    }

    for (let book of allBooks) {
        subscriber.next(book);
    }

    // calling a complete method on the subscriber parameter
    //  to tell the subscriber that the observable is done producing
    //  values, set Timeout functions to wait  before calling complete
    // to make it easier to observe what is happening
    setTimeout(() => {
        subscriber.complete();
    }, 2000);

    // Once an observable call error or complete, no new values will be produced

    return () => console.log('Executing tear down code');
});

// An observable is not executed untill an object is subscri bed to it

// .subscribe calls the function susbscribe defined for the observable
allBooksObservable$.subscribe(book => console.log(book.title));

console.log(' ');
console.log('From function ');

// Of function returns an observable , '
// Of' And 'From' functions are usefull for creating an observable from data that I already have
//Of function
let source1$ = of('hello', 10, true, allReaders[0].name);

source1$.subscribe(value => console.log(value));

console.log(' ');
console.log('From function ');
//From function 
// Pass a single object that already encapsulates a group of values
let source2$ = from(allBooks) // allBooks arrays should give a on observable
source2$.subscribe(book => console.log(book.title));

console.log(' ');
console.log('Concat function ');
// Concat will return a single observable that will produce 
// all of the values from the fisrt observabble followed by all of the values from the second oBservabble
concat(source1$, source2$)
    .subscribe(value => console.log(value));;

// Creating an observable with a button click
console.log(' ');
console.log('Observable from ckick event ');
let button = document.getElementById('readersButton');
fromEvent(button, 'click')
    .subscribe(event => {
        console.log(event);

        let readersDiv = document.getElementById('readers');
        for (let reader of allReaders) {
            readersDiv.innerHTML += reader.name + '</br>';

        }
    })

// Ajax requests with RxJS
console.log(' ');
console.log('Ajax requests with RxJS ');
let buttonAjax = document.getElementById('readersButton');
fromEvent(buttonAjax, 'click')
    .subscribe(event => {
        ajax('api/readers')
            .subscribe(ajaxResponse => {
                console.log(ajaxResponse);
                let readers = ajaxResponse.response;

                let readersDiv = document.getElementById('readers');
                for (let reader of readers) {
                    readersDiv.innerHTML += reader.name + '</br>';

                }
            });
    });