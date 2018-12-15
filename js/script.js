const $body = $('body');
const $wikiElem = $('#wikipedia-links');
const $nytHeaderElem = $('#nytimes-header');
const $nytElem = $('#nytimes-articles');
const $greeting = $('#greeting');
var streetStr = $('#street').val(); // get the value from the input street
var cityStr = $('#city').val(); // get the value from the input city
var address = streetStr + ', ' + cityStr; // the formula of location 

    
    
//nytimes by fetch 
const nyTimes_Fetch = async function () {
    const requestNY = await fetch(`http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${cityStr}&sort=newest&api-key=b2a43a3a403243cfae29425511b30f66`,{})
    if (requestNY.status = 200) {
        const requestNY2 = await requestNY.json()
        const responseF  = requestNY2.response.docs
        responseF.forEach(article => {
            $nytElem.append('<li class="article">'+
                '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
                   '<p>' + article.snippet + '</p>'+
                  '</li>');
            
        });

    }
    else {
        throw new Error ('Check your url')
    }
}

function loadData() {

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");


    $greeting.text('So, you want to live at ' + address + '?');




    streetStr = $('#street').val(); // get the value from the input street
    cityStr = $('#city').val(); // get the value from the input city    
     
    var wikiUrl = 'http://en.wikipedia.org/w/api.php?action=opensearch&search=' + cityStr + '&format=json&callback=wikiCallback';
    var wikiRequestTimeout = setTimeout(function(){
        $wikiElem.text("failed to get wikipedia resources");
    }, 8000);

    $.ajax({
        url: wikiUrl,
        dataType: "jsonp",
        jsonp: "callback",
        success: function( response ) {
            console.log(response)
            var articleList = response[1];

            for (var i = 0; i < articleList.length; i++) {
                articleStr = articleList[i];
                var url = 'http://en.wikipedia.org/wiki/' + articleStr;
                $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
            };

            clearTimeout(wikiRequestTimeout);
        }
    });





    // load nytimes
    nyTimes_Fetch()

    

    return false;
};

$('#form-container').submit(loadData);
