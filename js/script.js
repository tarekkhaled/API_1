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
        throw new Error ('Check your URL')
    }
}

//Wikipedia by fetch 
const wikiPe_Fetch = async function () {
    const requestWP =  fetch(`http://en.wikipedia.org/w/api.php?action=opensearch&search=${cityStr}&format=json&callback=wikiCallback`,{mode:'cors'})
    console.log(requestWP)

}

function loadData() {

   

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");


    $greeting.text('So, you want to live at ' + address + '?');




    // load nytimes
    nyTimes_Fetch()



    // var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + cityStr + '&sort=newest&api-key=b2a43a3a403243cfae29425511b30f66';
    // $.getJSON(nytimesUrl, function(data){ // abstraction method from ajax function and parse 
    //     // data as object

    //     $nytHeaderElem.text('New York Times Articles About ' + cityStr);

    //     articles = data.response.docs;
    //     for (var i = 0; i < articles.length; i++) {
    //         var article = articles[i];
    //         $nytElem.append('<li class="article">'+
    //             '<a href="'+article.web_url+'">'+article.headline.main+'</a>'+
    //             '<p>' + article.snippet + '</p>'+
    //         '</li>');
    //     };

    // }).error(function(e){
    //     $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    // });



    // load wikipedia data
    
    // var wikiRequestTimeout = setTimeout(function(){
    //     $wikiElem.text("failed to get wikipedia resources");
    // }, 8000);

    // $.ajax({
    //     url: wikiUrl,
    //     dataType: "jsonp",
    //     jsonp: "callback",
    //     success: function( response ) {
    //         console.log(response)
    //         var articleList = response[1];

    //         for (var i = 0; i < articleList.length; i++) {
    //             articleStr = articleList[i];
    //             var url = 'http://en.wikipedia.org/wiki/' + articleStr;
    //             $wikiElem.append('<li><a href="' + url + '">' + articleStr + '</a></li>');
    //         };

    //         clearTimeout(wikiRequestTimeout);
    //     }
    // });

    wikiPe_Fetch()

    return false;
};

$('#form-container').submit(loadData);
