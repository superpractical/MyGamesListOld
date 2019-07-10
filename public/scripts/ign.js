var url = 'https://newsapi.org/v2/top-headlines?sources=ign&apiKey=78322e2a265e4bce9585ba22f1e9e7bc';
var req = new Request(url);

let container1 = document.getElementById('slider');

fetch(req)
    .then(function(response) {
        response.json().then((data) => {

            var numArticles = data.articles.length;

            let slidesDiv = document.createElement('div');
            slidesDiv.setAttribute('class', 'slides');

            container1.appendChild(slidesDiv);

            for (let i = 0; i < numArticles; i++) {
                let specificSlide = document.createElement('div');
                divId = 'slide' + i;
                specificSlide.setAttribute('id', divId);
                specificSlide.setAttribute('class', 'imgDescriptionWrapper');

                specificSlide.innerHTML = "<img id='image" + i + "' class='imgElement' src='" + data.articles[i].urlToImage + "'></img>";

                slidesDiv.appendChild(specificSlide);

                let imgDescription = document.createElement('div');
                imgDescription.setAttribute('class', 'imgDescription');
                imgDescription.innerHTML = "<p style='font-size: 20px;' class='img_description_text'>" + data.articles[i].title + "<br>By: " + data.articles[i].author + "<br>Source: <a href='" + data.articles[i].url + "'>" + data.articles[i].source.name + "</a><br /><br />";

                specificSlide.appendChild(imgDescription);
            }

        });
    })