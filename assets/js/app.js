$(document).ready(function() {


    var data = new Firebase("https://reaustin.firebaseio.com/");

    function initBinMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 17
      });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              infoWindow.close();
              map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }

    
    function initContributeMap(){
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 17
      });
        var infoWindow = new google.maps.InfoWindow({map: map});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
              };
              infoWindow.close();
              map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }

        google.maps.event.addListener(map, 'click', function(event) {
            placeMarker(event.latLng);
        });

        function placeMarker(location) {
            var marker = new google.maps.Marker({
                position: location,
                map: map
            });
        }


        // Try HTML5 geolocation.
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };


                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                map.setCenter(pos);
            }, function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }
        //Function to pull up table for the marker
    var html ="<table>" +
    "<tr><td>Your Name:</td> <td><input type='text' id='name'> </td> </tr>" +
    "<tr><td>Type of Bin:</td> <td><select id='type'>" +
    "<option value='publicBin' SELECTED>Public Bin</option>" +
    "<option value='privateBin'>Private Bin</option>" +
    "</select> </td></tr>" +
    "<tr><td></td><td><input type='button' value='Save & Close' onclick='saveData()'/></td></tr>"

        function saveData() {
            var name = $("#name").val().trim();
            var type = $("#type").val().trim();
            var latlng = marker.getPosition();
            
            data.push({
                name: name,
                type: type,
                position: latlng,
                dateAdded: Firebase.ServerValue.TIMESTAMP
            }); 
        }


    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
    }
    $("body").on('click', '.binButton', function(event) {
        event.preventDefault();
        console.log("bins")
        $("#contributeSection").attr("data-sec", "bin");
        $("#signUpSection").attr("data-sec", "bin");
        $("#index-banner").attr("data-sec", "bin");
        function showMap(currentSection) {
            if (currentSection == "#binSection") {

            } else {
                $(currentSection).hide({
                    event: "slide",
                    duration: 2000,
                    complete: function() {
                        $("#binSection").fadeIn(0);
                        initMap();
                        initBinMap();
                    }
                });
            }
        }
        if ($("#binSection").attr("data-sec") == "signUp") {
            showMap('#signUpSection');
        } else if ($("#binSection").attr("data-sec") == "contribute") {
            showMap('#contributeSection');
        } else if ($("#binSection").attr("data-sec") == "index-banner") {
            showMap('#index-banner')
        }
    });

//=============================Contribute Page=================================
    
     $("body").on('click', '.contributeButton', function(event) {
        event.preventDefault();
        $("#binSection").attr("data-sec", "contribute");
        $("#signUpSection").attr("data-sec", "contribute");
        $("#index-banner").attr("data-sec", "contribute");

        function showMap(currentSection) {
            if (currentSection == "#contributeSection") {

            } else {
                $(currentSection).hide({
                    event: "slide",
                    duration: 2000,
                    complete: function() {
                        $("#contributeSection").fadeIn(0);
                        initContributeMap();
                    }
                });
            }
        }
        if ($("#contributeSection").attr("data-sec") == "signUp") {
            showMap('#signUpSection');
        } else if ($("#contributeSection").attr("data-sec") == "bin") {
            showMap('#binSection');
        } else if ($("#contributeSection").attr("data-sec") == "index-banner") {
            showMap('#index-banner')
        }
});

//============================================================================

    $("body").on('click', '.bbuttonIcon', function(event) {
        event.preventDefault();
        $("#sideBarComments").removeClass("hoverable");
        $(".bbuttonIcon").css('display', 'none');
        $("#sideBarComments").animate({
            marginTop: '0%',
            marginLeft: '-30%',
            width: '35%',
            height: '400px',
            borderRadius: '0%',
            backgroundColor: '#2980b9',
            backgroundColor: 'rgba(41, 128, 185, 0.6)',
        }, 1000).delay(0)

            .queue(function(n) {
                $("#sideBarComments").removeClass("valign-wrapper hoverable");

                $(".xbuttonIcon").css('display', 'inline-block');
                $(".popout").css('display', 'inline-block');
                n();
            });
    });

//=========================================================================

    $("body").on('click', '.xbi', function(event) {
        event.preventDefault();
        $("#sideBarComments").removeClass("hoverable");
        $(".xbuttonIcon").css('display', 'none');
        $(".popout").css('display', 'none');
        $("#sideBarComments").animate({
            marginLeft: '0',
            height: '50px',
            width: '50px',
            marginTop: '300px',
            backgroundColor: '#2980b9',
            borderRadius: '50%',
        }, 1000).delay(0)
            .queue(function(n) {
                $("#sideBarComments").addClass("valign-wrapper hoverable");
                $(".bbuttonIcon").css('display', 'inline-block');
                n();
            });
    });


//==========================================================================

    $("body").on('mouseover', '.xbuttonIcon', function(event) {
        $("#sideBarComments").addClass("hoverable");
    });
   

//====================================================================

    $("body").on('click', '.signUpButton', function(event) {
        event.preventDefault();
        $("#binSection").attr("data-sec", "signUp");
        $("#contributeSection").attr("data-sec", "signUp");
        $("#index-banner").attr("data-sec", "signUp");
        function showMap(currentSection) {
            if (currentSection == "#signUpSection") {

            } else {
                $(currentSection).hide({
                    event: "slide",
                    duration: 2000,
                    complete: function() {
                        $("#signUpSection").fadeIn(0);
                        initMap();
                    }
                });
            }
        }
        if ($("#signUpSection").attr("data-sec") == "contribute") {
            showMap('#contributeSection');
        } else if ($("#signUpSection").attr("data-sec") == "bin") {
            showMap('#binSection');
        } else if ($("#signUpSection").attr("data-sec") == "index-banner") {
            showMap('#index-banner')

        }
    });

//=======================================================================

    $("body").on('click', '#logo-container', function(event) {
        event.preventDefault();
        $("#binSection").attr("data-sec", "index-banner");
        $("#contributeSection").attr("data-sec", "index-banner");
        $("#signUpSection").attr("data-sec", "index-banner");
        $("#index-banner").show("slide", 2000);
        $("#binSection").css('display', 'none');
        $("#signUpSection").css('display', 'none');
        $("#contributeSection").css('display', 'none');
        $("#sideBarComments").removeClass("hoverable");
        $(".xbuttonIcon").css('display', 'none');
        $(".popout").css('display', 'none');
        $("#sideBarComments").animate({
        	marginLeft: '0',
        	height: '50px',
            width: '50px',
            marginTop: '300px',
            backgroundColor: '#2980b9',
            borderRadius: '50%',
        }, 1000).delay(0)
        .queue(function(n) {                 
            $("#sideBarComments").addClass("valign-wrapper hoverable");
            $(".bbuttonIcon").css('display', 'inline-block');
            n();
        });
    });

//========================================================================
});
