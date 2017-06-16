'use strict';

import yelp from 'yelp-fusion';
import {clientId, clientSecret} from './secret'

export const yelpSearch = (keywords, filterType, location) => {
    // authenticate with yelp API, obtain an access token
    yelp.accessToken(clientId, clientSecret).then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        if (filterType === 'delivery') {
            client.transactionSearch('delivery', {
                location: location
            }).then(response => {
                console.log(response.jsonBody.businesses);
                // console.log(response.jsonBody.businesses[0].name);
            }).catch(e => {
                console.log(e);
            });
        } else if (filterType === 'business') {
            client.business(keywords).then(response => {
                console.log(response.jsonBody.name);
            }).catch(e => {
                console.log(e);
            });
        }else if (filterType === 'reviews') {
            client.reviews(keywords).then(response => {
                console.log(response.jsonBody.reviews);
            }).catch(e => {
                console.log(e);
            });
        } else { // search by keywords restaurants nearby
            let searchRequest = {
                term: keywords,
                location: location
            }
            console.log('searchRequest = ', searchRequest)
            client.search(searchRequest).then(response => {
                const firstResult = response.jsonBody.businesses;
                const prettyJson = JSON.stringify(firstResult, null, 4);
                console.log(prettyJson);
            })
        }

    }).catch(e => {
        console.log(e);
}
