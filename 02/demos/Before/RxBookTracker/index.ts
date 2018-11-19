//alert("Hello RxJS!");
import { Observable, Subscriber, of, from, fromEvent } from 'rxjs';
import { allBooks } from "./data";

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

