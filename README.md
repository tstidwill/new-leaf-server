# new leaf :leaves:

BrainStation Software Engineering Bootcamp Capstone Project

Please feel free to check out my site at **www.new-leaf.info**

## Overview

Your ultimate companion for sustainable living. Discover nearby **community gardens**, **zero-waste shops** and **thrift stores** with our interactive map. Stay informed and spread awareness on upcoming **volunteering opportunities**, **protests** and **other green events**. Turn over a new leaf for a greener tomorrow.

### Problem

The existential climate crisis is overwhelming. This app aims to make sustainable living more accessible, convenient and aims to raise awareness by bringing community together.

### User Profile

Those interested in living more sustainably looking for shops & resources near them or near a certain location. Individuals wanting to discover community events.

### Features

- As a user, I want to be able to find the closest community garden(s), thrift store(s), and/or zero-waste grocery store(s) to a location
- As a user I want to be able to find events near me

## To Run

You will need a Google Maps API Key:
https://developers.google.com/maps/documentation/embed/get-api-key

and to create a MapID:
https://developers.google.com/maps/documentation/get-map-id
(default Raster, I called my map newleaf)

client .env sample:

```
VITE_GOOGLE_MAPS_API_KEY=your_api_key
VITE_GOOGLE_MAPS_MAP_ID=your_map_id
VITE_CORS_ORIGIN = http://localhost:8080
```

server .env sample:

```
CORS_ORIGIN = http://localhost:5173
PORT=8080

DB_HOST=127.0.0.1
DB_USER=
DB_PASSWORD=
DB_NAME=new_leaf
VITE_GOOGLE_MAPS_API_KEY=your_api_key
```

- server: npm i, npx knex migrate:latest, npx knex seed:run, node server.js,
- client: npm i , npm run dev

## Implementation

### Tech Stack

- Vite + React
- MySQL
- Express
- Client libraries:
  - react
  - react-router
  - axios
  - @vis.gl/react-google-maps
- Server libraries:
  - knex
  - express
  - Netflify
  - Heroku

### APIs

- Google Maps JavaScript API to display map
- Google Maps Geocoding API to convert postal codes to coordinates
- Google Places API to search for location

### Sitemap

- Landing Page: User input for location
- Discover Page: Map with list of shops based on postal code
- Events Page: List of upcoming sustainability events

### Mockups

#### Landing Page

![](src/assets/mockups/Landing_Mobile
.png)
![](src/assets/mockups/Landing_Desktop
.png)

#### Map locations & events

![](src/assets/mockups/Discover_Mobile.png)
![](src/assets/mockups/Discover_Desktop.png)

#### Events

![](src/assets/mockups/Events_Mobile.png)
![](src/assets/mockups/Events_Desktop.png)

### Endpoints

**GET /leaves**

- Get all locations within 1km of inputted postal code

Parameters:

- Postal code: User-provided as a string

Response:

```
[
    {
        "id": 1,
        "type": "Grocery Store"
        "lat": 45.410034
        "lng": -75.6783344
        "name": "Nu Grocery",
        "address": "143 Main St, Ottawa"
        "description": "Ontario's first fero waste grocery store."
        "place_id": "awohiawbdasbdiuahwd232"
    },
    ...
]
```

**GET /events**

- Get all upcoming events

Response:

```
[
    {
        "id": 1,
        "name": "Glebe Community Association's Aannual Park Clean-Up 2024",
        "location": "Capital Park"
        "date": 04-05-2024
        "type": "Park Cleanup"
        "description": "Come together with your friends, family, and neighbours to the park clean-up near you, make some new acquaintances  – and create some more wonderful neighbourhood moments and memories! "

    },
    ...
]
```

## Roadmap

- Design & build client using Vite + React :white_check_mark:
- Setup Express server :white_check_mark:
- Create database with knex :white_check_mark:
- Connect to Google Geocode service :white_check_mark:
- Connect to Google Maps API :white_check_mark:
- Connect to Google Places API :white_check_mark:
- Bug fixes :white_check_mark:
- DEMO DAY:white_check_mark:
- Continued Development :star: _Current Stage_

## Next Steps

- Deploy to new-leaf.info :white_check_mark:
- Connect to Google Places Details to fetch more location data :white_check_mark:
- Add login/register functionality
- Add location functionality to events
- Add sorting and filtering to events
- Add ability to add & share events
- Add ability to save favorite shops
- Add contact me page with option to suggest new leaves
