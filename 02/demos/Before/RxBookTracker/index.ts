//alert("Hello RxJS!");
import { Observable, Subscriber, of, from, fromEvent, concat, interval } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { allBooks, allReaders } from "./data";


//#region Creating Observables


// /**---------------First and most basic form----------------------- */
// // This function defines what will happen when 
// // the observable is executed
// // function subscribe(subscriber) {
// //     for (let book of allBooks) {
// //         subscriber.next(book);      
// //     }
// // }
// // let allBooksObservable$ = new Observable(subscribe);

// /**---------------First and most basic form----------------------- */


// // let allBooksObservable$ = new Observable(subscriber => {
// let allBooksObservable$ = Observable.create(subscriber => { // Funciona igual que con new anterior

//     // Three methods of the observable interface being used
//     if (document.title !== 'RxBookTracker') {
//         subscriber.error('Incorrect page title.');
//     }

//     for (let book of allBooks) {
//         subscriber.next(book);
//     }

//     // calling a complete method on the subscriber parameter
//     //  to tell the subscriber that the observable is done producing
//     //  values, set Timeout functions to wait  before calling complete
//     // to make it easier to observe what is happening
//     setTimeout(() => {
//         subscriber.complete();
//     }, 2000);

//     // Once an observable call error or complete, no new values will be produced

//     return () => console.log('Executing tear down code');
// });

// // An observable is not executed untill an object is subscri bed to it

// // .subscribe calls the function susbscribe defined for the observable
// allBooksObservable$.subscribe(book => console.log(book.title));

// console.log(' ');
// console.log('From function ');

// // Of function returns an observable , '
// // Of' And 'From' functions are usefull for creating an observable from data that I already have
// //Of function
// let source1$ = of('hello', 10, true, allReaders[0].name);

// source1$.subscribe(value => console.log(value));

// console.log(' ');
// console.log('From function ');
// //From function 
// // Pass a single object that already encapsulates a group of values
// let source2$ = from(allBooks) // allBooks arrays should give a on observable
// source2$.subscribe(book => console.log(book.title));

// console.log(' ');
// console.log('Concat function ');
// // Concat will return a single observable that will produce 
// // all of the values from the fisrt observabble followed by all of the values from the second oBservabble
// concat(source1$, source2$)
//     .subscribe(value => console.log(value));;

// // Creating an observable with a button click
// console.log(' ');
// console.log('Observable from ckick event ');
// let button = document.getElementById('readersButton');
// fromEvent(button, 'click')
//     .subscribe(event => {
//         console.log(event);

//         let readersDiv = document.getElementById('readers');
//         for (let reader of allReaders) {
//             readersDiv.innerHTML += reader.name + '</br>';

//         }
//     })

// // Ajax requests with RxJS
// console.log(' ');
// console.log('Ajax requests with RxJS ');
// let buttonAjax = document.getElementById('readersButton');
// fromEvent(buttonAjax, 'click')
//     .subscribe(event => {
//         ajax('api/readers')
//             .subscribe(ajaxResponse => {
//                 console.log(ajaxResponse);
//                 let readers = ajaxResponse.response;

//                 let readersDiv = document.getElementById('readers');
//                 for (let reader of readers) {
//                     readersDiv.innerHTML += reader.name + '</br>';

//                 }
//             });
//     });

// // Observers implement the observer interface which has three methods that happen
// // to correspond the callback functions on an observer
// // One way to create an observer -->
// let myObserver = {
//     next: value => console.log(`Value produced: ${value}`),
//     error: err => console.log(`ERROR: ${err}`),
//     complete: () => console.log(`All done producing values`) // Does not pass any parameters, will be called if the observable sends a completion message
// }

// // Subscribing with an observer
// let sourceObservable$ = of(2, 3, 5);

// sourceObservable$.subscribe(myObserver);

// // Passing the callback functions directly to subscribe
// sourceObservable$.subscribe(
//     value => console.log(`Value produced: ${value}`),
//     err => console.log(`ERROR: ${err}`),
//     () => console.log(`All done producing values`)
//     // By passing functions to subscribe like this on observer object is created 
//     // behind the scenes using these functions.

//     // Here when I subscribe to the observable, the observer is being used
//     // on an observer instance to receive those values
// );

// sourceObservable$.subscribe(
//     value => console.log(`Value produced: ${value}`),
//     err => console.log(`ERROR: ${err}`)
//     // Each of the functions are optional
// );

// sourceObservable$.subscribe(
//     value => console.log(`Value produced: ${value}`)
//     // Each of the functions are optional
// );

// // Observers vs. Subscribers
// // Array of numbers I want produced by an observable
// let myNumbers = [1, 4, 5];

// // creating new observables from scratch by passing a 
// // function to the observable constructor which takes a subscriber as a parameter
// // it's also an object that implements the observer interface

// let numberObservable$ = new Observable(subscriber => {

//     // subscriber is also used to push values to the observers by calling
//     // next, error, and complete
//     if (myNumbers.length === 0) { subscriber.error('No values'); }

//     for (let num of myNumbers) {
//         subscriber.next(num);
//     }

//     subscriber.complete();

//     // Here the observer interface is used to produce values from an observable
// });


//#endregion

//#region Subscribing to Observables with Observers

let books$ = from(allBooks); // Creating a new observable

let booksObserver = {
    next: book => console.log(`Title: ${book.title}`),
    error: err => console.log(`ERROR: ${err}`),
    complete: () => console.log(`All done producing values`)
}

console.log("Subscribing to Observables with Observers");
console.log("----------------------------------------   ");
books$.subscribe(booksObserver);
console.log("   ");
console.log("Other more concise way created and subscribed");
console.log("----------------------------------------   ");
books$.subscribe(
    book => console.log(`Title: ${book.title}`),
    err => console.log(`ERROR: ${err}`),
    () => console.log(`All done producing values`)
);


console.log("   ");
console.log("Three calls tu subscribe on the same observable instance");
console.log("----------------------------------------   ");

//Several observers in an obsersable

//Creating observable first way, susbcribing and using the observer interface
let currentTime$ = new Observable(subscriber => {
    const timeString = new Date().toLocaleTimeString();
    subscriber.next(timeString);
    subscriber.complete();
})


    // 1811213668 esperar agendamiento visita entrega de boleta johana esterlin estereopicnic
// Subscribing to the observable
currentTime$.subscribe(
    currentTime => console.log(`Observer 1: ${currentTime}`)
);

setTimeout(() => {
    currentTime$.subscribe(
        currentTime => console.log(`Observer 2: ${currentTime}`)
    );
}, 1000);

setTimeout(() => {
    currentTime$.subscribe(
        currentTime => console.log(`Observer 3: ${currentTime}`)
    );
}, 2000);

// three calls tu subscribe on the same observable instance and they each happen one second apart
// The observe will log the curretTime Value produced by the observable


// THe subscribed methos returns a subscription object

// The observables gets cancelled when runs out of values to produce and then sends a completion method to the observer
// the observer gets cancelled when it encounters an error, reporting it to the observer and stoping the execution


// Unsubscribing
console.log("  ");
console.log("Unsubscribing with button event");
let timesDiv = document.getElementById('times');
let button = document.getElementById('timerButton');

// Creating observable with another bulti in function (INTERVAL)
// that will return an observable that produces an string of integers, produced at a specified interval
let timer1$ = interval(1000); // change name to timer$

let timer$ = new Observable(subscriber => { // change name to timer$
    let i = 0;
    let intervalID = setInterval(() => {
        subscriber.next(i++);
    }, 1000);

    // this kind of observables should return a function that will take care of cleaning up and releasing
    // any resources used by the observables once it quits executing

    return () => {
        console.log('Executing tear down code');
        clearInterval(intervalID);
    }
});

let timerSubscription = timer$.subscribe(
    value => timesDiv.innerHTML += `${new Date().toLocaleTimeString()} (${value}) <br/>`,
    null, 
    () => console.log('All done"')
)

// Ad done susbscription to another and cancel them both with a single call to unsubscribe
let timerConsoleSubscription = timer$.subscribe(
    value => console.log(`${new Date().toLocaleTimeString()} (${value})`)
);

// Adding a subscription to another subscription
timerSubscription.add(timerConsoleSubscription);
// timerSubscription.remove(timerConsoleSubscription); // removes the subscription

fromEvent(button, 'click')
    .subscribe(
        event => timerSubscription.unsubscribe() //If timerconsoleSUbscription is added to timersubscription, both will get canceled
    );


//#endregion
