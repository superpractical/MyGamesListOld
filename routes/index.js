const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');

const bodyParser= require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));

// Welcome Page
router.get('/', (req, res) => res.render('welcome'));

// Dashboard Page
var request = require("request");

var popGamesOptions = {
    url: 'https://api-v3.igdb.com/games/?fields=age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks.url,bundles,category,collection,cover.url,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres.name,hypes,involved_companies.company.name,keywords,multiplayer_modes,name,parent_game,platforms.name,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates.human,screenshots.url,similar_games.name,similar_games.cover.url,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites.url&order=popularity:desc&limit=20',
    headers: {
        "user-key": "c004e523b0d33848aa3279311193d236"
    },
    dataType: "jsonp",
};

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    request(popGamesOptions, (error, response) => {
        if (error) {
            res.sendStatus(504);
        } 
        else {
            let parsedResponse = JSON.parse(response.body);

            res.render('dashboard', {
                parsedResponse: parsedResponse,
                name: req.user.name 
            });
    }})
})

// Games Page
router.get('/games', ensureAuthenticated, (req, res) => {
    var allGames = {
        url: 'https://api-v3.igdb.com/games/?fields=age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks.url,bundles,category,collection,cover.url,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres.name,hypes,involved_companies.company.name,keywords,multiplayer_modes,name,parent_game,platforms.name,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates.human,screenshots.url,similar_games.name,similar_games.cover.url,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites.url&order=popularity:desc&limit=50',
        headers: {
            "user-key": "c004e523b0d33848aa3279311193d236"
        },
        dataType: "jsonp",
    };
    
    request(allGames, (error, response) => {
        if (error) {
            res.sendStatus(504);
        } 
        else {
            let searchResponse = JSON.parse(response.body);

            res.render('games', {
                name: req.user.name,
                searchResponse: searchResponse,
            });
    }})

    router.post('/games', (req, res) => {    
        var searchOptions = {
            url: 'https://api-v3.igdb.com/games/?fields=age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks.url,bundles,category,collection,cover.url,created_at,dlcs,expansions,external_games,first_release_date,follows,franchise,franchises,game_engines,game_modes,genres.name,hypes,involved_companies.company.name,keywords,multiplayer_modes,name,parent_game,platforms.name,player_perspectives,popularity,pulse_count,rating,rating_count,release_dates.human,screenshots.url,similar_games.name,similar_games.cover.url,slug,standalone_expansions,status,storyline,summary,tags,themes,time_to_beat,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites.url&limit=50&offset=0&search=' + req.body.search + '&filter[release_dates.platform][eq]=6',
            headers: {
                "user-key": "c004e523b0d33848aa3279311193d236"
            },
            dataType: "jsonp",
        };

        request(searchOptions, (error, response) => {
            if (error) {
                res.sendStatus(504);
            } 
            else {
                let searchResponse = JSON.parse(response.body);

                res.render('games', {
                    name: req.user.name,
                    searchResponse: searchResponse,
                });
        }})
    })
})

// Friends Page
router.get('/friends', ensureAuthenticated, (req, res) => {
    res.render('friends', {
        name: req.user.name 
    });
})

module.exports = router;