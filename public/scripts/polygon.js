var url = 'https://newsapi.org/v2/top-headlines?sources=polygon&apiKey=78322e2a265e4bce9585ba22f1e9e7bc';
var req = new Request(url);

let container = document.getElementById('polygonOutputDiv');
let feedNum = document.getElementById('feedNum');

fetch(req)
    .then(function(response) {
        response.json().then((data) => {

            var numArticles = data.articles.length;

            feedNum.innerHTML = "Your Feed (" + data.articles.length + ")";

            for (let i = 0; i < numArticles; i++) {

                var newdiv = document.createElement('div');

                var divIdName = '0'+i;
                newdiv.setAttribute('id',divIdName);

                newdiv.innerHTML ="<img id='image" + i + "' class='imgElement' src='" + data.articles[i].urlToImage + "'></img><br />" + data.articles[i].title + "<br />By: " + data.articles[i].author + "<br />Source: <a href='" + data.articles[i].url + "'>" + data.articles[i].source.name + "</a><br /><br />";

                container.appendChild(newdiv);

            }
        });
    })
    