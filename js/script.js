
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
	
	//var street = $( "#street" ).val();
	//var city = $( "#city" ).val();
    //var svString = '<img class="bgimg" src="http://maps.googleapis.com/maps/api/streetview?size=600x300&location=';
    //svString = svString.concat( street );
    //svString = svString.concat( ', ');
    //svString = svString.concat( city );
    //svString = svString.concat('">');
	//$body.append( svString );

    var streetStr = $('#street').val();
    var cityStr = $('#city').val();
    var address = streetStr + ', ' + cityStr;

    $greeting.text('So, you want to live at ' + address + '?');

    var streetviewUrl = 'http://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + address + '';
    $body.append('<img class="bgimg" src="' + streetviewUrl + '">');


    var nytUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    nytUrl += '?' + $.param({
        'api-key': "24075f2187a74e17a942c059b8b6ba11",
        'q': cityStr
    });

    $.getJSON( nytUrl, function( data ) {
        $nytHeaderElem.text('New York Times Articles About ' + cityStr);

        var items = [];
        $.each( data.response.docs, function( key, val ) {
            items.push( "<li class='article' id='" + key + "'><a href='" + 
                val.web_url + "'>" + val.headline.main + "</a><p>" + 
                val.snippet + "</p></li>" );
        });

        $( "<ul/>", {
            "id": "nytimes-articles",
            html: items.join( "" )
        }).appendTo( "body" );
    })
    .fail(function( error ) {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded');
    });

    return false;
};

$('#form-container').submit(loadData);


