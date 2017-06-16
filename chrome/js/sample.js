'use strict';

const yelp = require('yelp-fusion');

const clientId = '2lUQ_W4PCGU7b_AfgDN6Tw';
const clientSecret = 'freTjoBNaRNsg2KCBvm83QBVN31kvkkPmvlI15HFRFczsM5RRJpmOErQTlB7f3pl';

const searchRequest = {
    term:'lady m',
    location: 'new york, ny'
};

yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);

    client.search(searchRequest).then(response => {
        const firstResult = response.jsonBody.businesses[0];
        const prettyJson = JSON.stringify(firstResult, null, 4);
        console.log(prettyJson);
    });

}).catch(e => {
    console.log(e);
});

// === term and location search === //

// client.search(searchRequest).then(response => {
//     const firstResult = response.jsonBody.businesses[0];
//     const prettyJson = JSON.stringify(firstResult, null, 4);
//     console.log(prettyJson);
// });

// === Phone Search === //

// client.phoneSearch({
//     phone:'+14157492060'
// }).then(response => {
//     console.log(response.jsonBody.businesses[0].name);
// }).catch(e => {
//     console.log(e);
// });

// === transaction search === //

// client.transactionSearch('delivery', {
//     location:'san diego'
// }).then(response => {
//     console.log(response.jsonBody.businesses[0].name);
// }).catch(e => {
//     console.log(e);
// });

// === business search === //

// client.business('gary-danko-san-francisco').then(response => {
//     console.log(response.jsonBody.name);
// }).catch(e => {
//     console.log(e);
// });

// === review search === //

// client.reviews('gary-danko-san-francisco').then(response => {
//     console.log(response.jsonBody.reviews[0].text);
// }).catch(e => {
//     console.log(e);
// });

// === autocomplete === //

// client.autocomplete({
//     text:'pizza'
// }).then(response => {
//     console.log(response.jsonBody.terms[0].text);
// }).catch(e => {
//     console.log(e);
// });

//
// <nav className="navbar navbar-default" role="navigation">
//     <div className="navbar-header">
//         <button type="button" classNameName="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
//             <span className="sr-only">Toggle navigation</span>
//             <span className="icon-bar"></span>
//             <span className="icon-bar"></span>
//             <span className="icon-bar"></span>
//         </button>
//         <a className="navbar-brand" href="#">Yelp Eater</a>
//     </div>
//
//     <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
//         <ul className="nav navbar-nav">
//             <li className="dropdown">
//                 <a href="#" className="dropdown-toggle" data-toggle="dropdown">Filter<b className="caret"></b></a>
//                 <ul className="dropdown-menu">
//                     <li><a href="#">Location</a></li>
//                     <li><a href="#">Cuisine</a></li>
//                     <li><a href="#">Reviews</a></li>
//                     <li><a href="#">Price</a></li>
//                     <li className="divider"></li>
//                     <li><a href="#">ALL RESTAURANTS</a></li>
//                 </ul>
//             </li>
//         </ul>
//
//         <form className="navbar-form navbar-left" role="search">
//             <div className="form-group">
//                 <input type="text" className="form-control" placeholder="Search">
//             </div>
//             <button type="submit" className="btn btn-default">Submit</button>
//         </form>
//     </div>
// </nav>
