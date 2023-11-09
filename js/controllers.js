angular.module('engineering-toolbox-bytel.controllers', ['ksSwiper', 'ngRows']).controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // toastr.info('Controlleurs initialisés avec succès', 'Storigin Consulting HR Tool', {timeOut: 5000});
})

    .controller('HomeCtrl', function ($scope, $http, $ionicPopup, PopupService, $http, $timeout, ngYoutubeEmbedService) {

        $.get("https://consulting.storigin.fr/excel/", function (data) {
            $scope.opportunities = data;
        });


        $scope.selectedRegion = null;
        $scope.regions = [];
        $scope.selectedExperience = null;
        $scope.experiences = [];
        $scope.selectedAvailability = null;
        $scope.availabilities = [];

        $http({
            method: 'GET',
            url: "https://api.storigin.fr/api/regions",
        }).then(function (response) {
            try {
                $scope.regions = response.data.data;
            } catch (e) {
                console.warn(e);
            }
        });

        $http({
            method: 'GET',
            url: "https://api.storigin.fr/api/experiences",
        }).then(function (response) {
            try {
                $scope.experiences = response.data.data;
            } catch (e) {
                console.warn(e);
            }
        });

        $http({
            method: 'GET',
            url: "https://api.storigin.fr/api/availabilities",
        }).then(function (response) {
            try {
                $scope.availabilities = response.data.data;
            } catch (e) {
                console.warn(e);
            }
        });

        $scope.addNewRegion = function(){


            // Use from $scope instead static
            const title = 'STATIC TEST ' + Math.floor((Math.random() * 100) + 1) ;

            let addNewRegionFormData = new FormData();
            addNewRegionFormData.append('title', title );

            $http({
                method:'POST',
                headers: {"Content-Type": undefined },
                url:"https://api.storigin.fr/api/regions",
                data:addNewRegionFormData
            }).then(function(response){
                try{
                    console.log( 'Adding Region response', response)
                }catch (e){

                }
            })
        }

        // CALL : addNewRegion method
        // $scope.addNewRegion();


        var vm = $scope;

        // Return a random element from an array
        Array.prototype.randomElement = function () {
            return this[Math.floor(Math.random() * this.length)];
        };

        var firstNames = ['Alan', 'Alice', 'Amber', 'Amanda', 'Barney', 'Bobby', 'Bethany', 'Casey', 'Clayton', 'Cody', 'Dillon', 'Dianne', 'Edward', 'Ethan', 'Eleanor', 'Frank', 'Francene', 'Gary', 'George', 'Georgia', 'Helen', 'Harry', 'Isaac', 'Julia', 'Justin', 'Keith', 'Kathleen', 'Larry', 'Martin', 'Mary', 'Mark', 'Megan', 'Nathan', 'Oliver', 'Philip', 'Ray', 'Rebecca', 'Steve', 'Sara', 'Tina', 'Terry', 'Vince', 'Walter', 'Zeke'];
        var lastNames = ['Adams', 'Brown', 'Blevins', 'Clayton', 'Dixon', 'Edwards', 'Fitzgerald', 'Gray', 'Greene', 'Harris', 'Ibanez', 'Jensen', 'Jefferson', 'Johnson', 'Kennedy', 'Lewis', 'Lincoln', 'Martin', 'McGuire', 'Motz', 'Meyer', 'Newton', 'Penn', 'Richards', 'Russell', 'Smith', 'Stevens', 'Sweet', 'Turner', 'Thompson', 'Vick', 'Waters', 'White', 'Woods'];

        vm.names = [];

        for (var i = 1; i <= 100000; i++) {
            vm.names.push({
                id: i,
                firstName: firstNames.randomElement(),
                lastName: lastNames.randomElement()
            });
        }


        var consultants = document.getElementById('consultants');

        new Chart(consultants, {
            type: 'bar',
            data: {
                labels: ['Product Owner', 'Architectes fonctionnels', 'Développeur Angular', 'Consultants Power BI', 'Project Manager', 'Designer UX/UI'],
                datasets: [{
                    label: 'Nombre de consultants par profils',
                    data: [12, 19, 3, 5, 2, 3],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                },
                backgroundColor: ['rgba(255, 205, 86, 1)']
            }
        });


        var candidatures = document.getElementById('candidatures');

        new Chart(candidatures, {
            type: 'bar',
            data: {
                labels: ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet'],
                datasets: [{
                    label: 'Nombre candidatures Consultants Storigin traitées',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        var API_KEY = "AIzaSyA87hNnwXHvbq-XVEwG1mq9Dx7zKrdVSh0";
        var _name = 'username';

        $scope.ytLiverecSwiper = {};
        $scope.onReadySwiper = function (swiper) {
            swiper.update();
        }

        /*****************************************************************  Knowledge Graph Search API *********************************************************/


        $.get("https://kgsearch.googleapis.com/v1/entities:search?query=Emmanuel%20Macron&key=" + API_KEY, function (data) {
            $(".result").html(data);
        });

        /***************************************************************** LiveRec Fixed Topic *********************************************************/

        $http({
            method: 'POST',
            data: {
                'kg_id': '/m/011ncr8c',
                'shelf_item_count': 10
            },
            url: "https://consulting.storigin.fr/curl/",
        }).then(function (response) {
            try {
                $scope.kgIdVal = response.data.shelves[0].shelfParam.kgId;
                $scope.kgTitle = response.data.shelves[0].title;

                $scope.fixedShelfTitles = response.data.shelves[0].title;
                var items = response.data.shelves[0].shelfItems;
                $scope.fixedTopicArray = [];

                for (let i = 0; i < items.length; i++) {
                    var topicObj = new Object();
                    topicObj.title = items[i].title;
                    topicObj.src = items[i].images[1].uri
                    topicObj.uri = items[i].uri.slice(29, 40);  // meilleure solution URLSearchParam
                    topicObj.creator = items[i].metadata[0];
                    topicObj.numberviews = items[i].metadata[1];
                    $scope.fixedTopicArray.push(topicObj);
                }
            } catch (e) {
                console.warn(e);
            }
        });

        /***************************************************************** LiveRec Topics Dynamique ****************************************************/

        $scope.kgInput = {};
        $scope.kgResponse = "";
        $scope.GetKgIdAndTopics = function () {
            $.get("https://kgsearch.googleapis.com/v1/entities:search?query=" + $scope.kgInput.criteria + "&key=" + API_KEY, function (data) {
                $(".result").html(data);

                $http({
                    method: 'POST',
                    data: {
                        'kg_id': data.itemListElement[0].result["@id"].slice(3, 14),
                        'shelf_item_count': 10
                    },
                    url: "https://consulting.storigin.fr/curl/",
                }).then(function (response) {
                    try {
                        console.log(response);
                        $scope.kgIdDynVal = response.data.shelves[0].shelfParam.kgId;
                        $scope.kgDynTitle = response.data.shelves[0].title;

                        $scope.dynShelfTitles = response.data.shelves[0].title;
                        var items = response.data.shelves[0].shelfItems;
                        $scope.dynTopicArray = [];

                        for (let i = 0; i < items.length; i++) {
                            var topicObj = new Object();
                            topicObj.title = items[i].title;
                            topicObj.src = items[i].images[1].uri
                            topicObj.uri = items[i].uri.slice(29, 40);  // meilleure solution URLSearchParam
                            topicObj.creator = items[i].metadata[0];
                            topicObj.numberviews = items[i].metadata[1];
                            $scope.dynTopicArray.push(topicObj);
                        }
                    } catch (e) {
                        console.warn(e);
                    }
                });


            });


        }

        /***************************************************************** LiveRec ****************************************************/

        $scope.topics = ['MOODS_AND_GENRES_MUSIC', 'TOP_NEWS', 'TRENDING_MUSIC', 'SPORTS_NEWS', 'TRENDING', 'TOP_CHARTS_MUSIC', 'NEW_RELEASES_MUSIC', 'TRENDING_GAMING'];
        $scope.topicArray = new Array();
        $scope.topicsArray = new Array();
        $scope.itemsRange = {
            val: 1,
            min: 1,
            max: 20
        };

        $scope.topicsData =
            {
                availableOptions:
                    [
                        {val: "MOODS_AND_GENRES_MUSIC", id: '1', name: 'Stations par genres et ambiances'},
                        {val: "TOP_NEWS", id: '2', name: 'Actualités'},
                        {val: "TRENDING_MUSIC", id: '3', name: 'Clips musicaux tendance'},
                        {val: "SPORTS_NEWS", id: '4', name: 'Actualités sportives'},
                        {val: "TRENDING", id: '5', name: 'Vidéos Tendances'},
                        {val: "TOP_CHARTS_MUSIC", id: '6', name: 'Meilleurs classements'},
                        {val: "NEW_RELEASES_MUSIC", id: '7', name: 'Nouveautés'},
                        {val: "TRENDING_GAMING", id: '8', name: 'Vidéos de gaming tendance'}
                    ]
                ,
                selectedOption: {val: "MOODS_AND_GENRES_MUSIC", id: '1', name: 'Stations par genres et ambiances'}
            };

        $scope.topicsLabel = {
            'MOODS_AND_GENRES_MUSIC': 'Stations par genres et ambiances',
            'TOP_NEWS': 'Actualités',
            'TRENDING_MUSIC': 'Clips musicaux tendance',
            'SPORTS_NEWS': 'Actualités sportives',
            'TRENDING': 'Vidéos Tendances',
            'TOP_CHARTS_MUSIC': 'Meilleurs classements',
            'NEW_RELEASES_MUSIC': 'Nouveautés',
            'TRENDING_GAMING': 'Vidéos de gaming tendance'
        };

        $scope.topicsValues =
            {
                MOODS_AND_GENRES_MUSIC: false,
                TOP_NEWS: false,
                TRENDING_MUSIC: false,
                SPORTS_NEWS: false,
                TRENDING: false,
                TOP_CHARTS_MUSIC: false,
                NEW_RELEASES_MUSIC: false,
                TRENDING_GAMING: false
            };

        /***************************************************************** FUNCTION GetMultipleTopic ****************************************************/

        $scope.GetMultipleTopic = function () {
            $scope.topicsArray = [];
            for (var i in $scope.topicsValues) {
                if ($scope.topicsValues[i] == true) {
                    $scope.topicsArray.push(i);
                }
            }

            $http({
                method: 'POST',
                data: {
                    'shelf_params': {'topics': $scope.topicsArray},
                    'shelf_item_count': $scope.itemsRange.val
                },
                url: "https://consulting.storigin.fr/curl/",
            }).then(function (response) {

                if (response.data.error)
                    toastr.error('Message : ' + response.data.error.message + ' Status : ' + response.data.error.status, 'Bytel Engineering Toolbox', {timeOut: 50000});

                try {

                    var itemArray = response.data.shelves;
                    var processTopicArray = [];
                    $scope.topicArray = [];
                    $scope.shelfTitles = "";

                    for (let j = 0; j < itemArray.length; j++) {

                        var shelfTitlesArray = [];
                        shelfTitlesArray.push(itemArray[j].title);

                        if ($scope.shelfTitles)
                            $scope.shelfTitles = $scope.shelfTitles + " , " + itemArray[j].title;
                        else
                            $scope.shelfTitles = itemArray[j].title;

                        var items = response.data.shelves[j].shelfItems;
                        var imgSrcIndex = 0;

                        for (let i = 0; i < items.length; i++) {
                            if (items[i].images.length < 4) {
                                imgSrcIndex = 1;
                            } else {
                                imgSrcIndex = 1;
                            }
                            var topicObj = new Object();
                            topicObj.title = items[i].title;
                            topicObj.src = items[i].images[imgSrcIndex].uri;
                            //topicObj.uri = "https://www.youtube.com/watch?v=" + items[ i ].uri.slice(29,40);  // meilleure solution URLSearchParam
                            topicObj.uri = items[i].uri.slice(29, 40);  // meilleure solution URLSearchParam
                            topicObj.description = items[i].description;
                            topicObj.creator = items[i].metadata[0];
                            topicObj.numberviews = items[i].metadata[1];

                            processTopicArray.push(topicObj);
                        }
                        /**
                         * Todo : Création de row dynamique + Création de Slider dynamique
                         * 1. Affecter dynamiquement les tableaux créent aux sliders
                         * 2. Afficher le nouveau slider
                         * 3. innerHTML de la DIV (child) appendChild
                         */

                        /*const br = document.createElement("br");
                        document.getElementById("LiveRecRow").appendChild(br);
                        const div = document.createElement("div");
                        const p = document.createElement("p");
                        const topicTitle = document.createTextNode( itemArray[j].title );
                        const h1 = document.createElement("h1");
                        h1.appendChild(topicTitle);
                        p.appendChild(h1);
                        div.appendChild(p);
                        document.getElementById("LiveRecRow").appendChild(div);*/
                    }
                    //$scope.shelfTitles = shelfTitlesArray;
                    $scope.topicArray = processTopicArray;

                    $scope.dynSwiper = '<ks-swiper-container initial-slide="1" loop="false" show-nav-buttons="true" slides-per-view="4" space-between="5" pagination-clickable="true" pagination-is-active="true" swiper="ytLiverecSwiper" id="ytLiverecSwiper" style="display:none!important">'
                        + '<ks-swiper-slide class="swiper-slide" ng-repeat="topic in topicArray">'
                        + '<div>'
                        + '<img style="border-radius: 20px; width:420px!important"  ng-src="{{ topic.src }}" ng-click="Play(\'{{ topic.uri }}\')">'
                        + '<img class="yt-logo" src="https://consulting.storigin.fr/img/youtube-logo.png">'
                        + '<br/>'
                        + '<span style="font-size:17px;"> {{ topic.title.slice(0, 35) }} ...</span>'
                        + '<br/>'
                        + '<span style="font-size:17px;color:red;font-weight:bold"> {{ topic.creator }} </span> <span style="font-size:17px;"> {{ topic.numberviews }} </span>'
                        + '</div>'
                        + '</ks-swiper-slide>'
                        + '</ks-swiper-container>'


                } catch (e) {

                    $scope.shelfTitles = "Merci de modifier votre sélection";
                }
            });

        }

        $scope.GetTopic = function () {

            $scope.topicsValues.MOODS_AND_GENRES_MUSIC = false;
            $scope.topicsValues.TOP_NEWS = false;
            $scope.topicsValues.TRENDING_MUSIC = false;
            $scope.topicsValues.SPORTS_NEWS = false;
            $scope.topicsValues.TRENDING = false;
            $scope.topicsValues.TOP_CHARTS_MUSIC = false;
            $scope.topicsValues.NEW_RELEASES_MUSIC = false;
            $scope.topicsValues.TRENDING_GAMING = false;

            $http({
                method: 'POST',
                data: {
                    'shelf_params': {'topics': [$scope.topicsData.selectedOption.val]},
                    'shelf_item_count': $scope.itemsRange.val
                },
                url: "https://consulting.storigin.fr/curl/",
            }).then(function (response) {

                try {
                    $scope.shelfTitles = response.data.shelves[0].title;
                    ;


                    var items = response.data.shelves[0].shelfItems;
                    $scope.topicArray = [];

                    for (let i = 0; i < items.length; i++) {
                        var topicObj = new Object();
                        topicObj.title = items[i].title;
                        topicObj.src = items[i].images[1].uri
                        topicObj.uri = items[i].uri.slice(29, 40);  // meilleure solution URLSearchParam
                        topicObj.creator = items[i].metadata[0];
                        topicObj.numberviews = items[i].metadata[1];

                        $scope.topicArray.push(topicObj);
                    }
                } catch (e) {
                    console.warn(e);
                }
            });
        }

        $scope.checkboxUtils = {
            set: function (name, values) {
            },
            get: function (name) {
                var cbs = document.getElementsByName(name),
                    count = cbs.length,
                    values = [],
                    i;
                for (i = 0; i < count; i++) {
                    if (cbs[i].checked)
                        values.push(cbs[i].value);
                }
                return values;
            }
        }

        $scope.user = {
            name: function (newName) {
                return arguments.length ? (_name = newName) : _name;
            }
        };

        $scope.data =
            {
                availableOptions:
                    [
                        {channelid: "UCFmN0sav0nBd0gsaPwrCFtA", id: '2', name: 'Seb Mellia'},
                        {channelid: "UCL5WDPEm30nG6kkBmF9bfig", id: '3', name: 'Naim Videos'},
                        {channelid: "UCHQda5vLxrH0Ff0I0kMq4zw", id: '5', name: 'Konbini'},
                        {channelid: "UCamTTlGH4IHd1xveSre1p8g", id: '6', name: 'Montreux Comedy'},
                        {channelid: "UCfcVlVplwcHZNrQpeXmeHTQ", id: '7', name: 'Bouygues Telecom'}
                    ]
                ,
                selectedOption: {id: '2', name: 'Seb Mellia'} //This sets the default value of the select in the ui
            };

        $.get("https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=UCFmN0sav0nBd0gsaPwrCFtA&maxResults=25&key=" + API_KEY, function (data) {
            $scope.dataChannels = data.items;
            $scope.ChannelsData = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            $scope.AssetData = data.items;
            $scope.MainEtag = data.items[0].etag;
            $scope.MainId = data.items[0].id;
            $scope.MainKind = data.items[0].kind;
            $scope.MainChannelId = data.items[0].snippet.channelId;
            $scope.MainChannelTitle = data.items[0].snippet.channelTitle;
            $scope.MainPublishedAt = data.items[0].snippet.publishedAt.slice(0, 10);
            $scope.MainThumbnailTitle = data.items[0].snippet.title.slice(0, 24) + "...";
            $scope.MainThumbnailImg = data.items[0].snippet.thumbnails.standard.url;
        });
        $.get("https://youtube.googleapis.com/youtube/v3/channelSections?part=snippet%2CcontentDetails&channelId=UCFmN0sav0nBd0gsaPwrCFtA&key=" + API_KEY, function (data) {
            $(".result").html(data);
        });
        // Gestion des Assets génériques à la chaine de sebmelia
        $.get("https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=UCFmN0sav0nBd0gsaPwrCFtA&key=" + API_KEY, function (data) {
            $(".result").html(data);
            $scope.dataHeader = data;
            $scope.MainChannelLogo = data.items[0].snippet.thumbnails.default.url;
            $scope.MainChannelCustomUrl = data.items[0].snippet.customUrl;
            $scope.MainChannelTitle = data.items[0].snippet.title;
            $scope.MainChannelDescription = data.items[0].snippet.description.slice(0, 140);
            $scope.MainChannelCountry = data.items[0].snippet.country;
        });

        $scope.popService = PopupService;
        $scope.CurrentService = "";

        $scope.OpenPopup = function (e) {
            $scope.isFocus = true;
            $scope.CurrentService = e;
            $scope.popService.openPopUp(e, $scope);
        }

        $scope.ClosePopup = function (e) {
            $scope.popService.closePopUp(e);
        }

        $scope.GetChannelId = function () {
            $.get("https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&forUsername=" + $scope.user.name() + "&key=" + API_KEY, function (data) {
                try {
                    $scope.GetData(data.items[0].id);
                } catch (e) {
                    console.log(e);
                    toastr.error('Aucune chaine trouvée pour ' + $scope.user.name(), 'Bytel Engineering Toolbox', {timeOut: 50000});
                }

            });
        }

        $scope.GetData = function (channelId) {
            //toastr.info('Découvrez les différentes fonctionnalités que proposent les API publics et professionnels de Youtube en parcourant les différents onglets ci-dessous. <br/> 1. <b>Chaines sélectionnées :</b> Sélectionnez une chaine dans la liste déroulante. <br/> <i><b>2. Chaine saisie : </b> </i>Retrouver une chaine en filtrant le nom de chaine', 'Bytel Engineering Toolbox', {timeOut: 50000});

            if (channelId.length > 1) {
                console.log(channelId);
            } else {
                channelId = $scope.data.selectedOption.channelid;
                console.log("select : " + channelId);
            }
            // info de chaine
            $.get("https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=" + channelId + "&key=" + API_KEY, function (data) {
                $(".result").html(data);
                $scope.MainChannelLogo = data.items[0].snippet.thumbnails.default.url;
                $scope.MainChannelCustomUrl = data.items[0].snippet.customUrl;
                $scope.MainChannelTitle = data.items[0].snippet.title;
                $scope.MainChannelDescription = data.items[0].snippet.description.slice(0, 140);
                $scope.MainChannelCountry = data.items[0].snippet.country;
            });
            // asset de chaine
            $.get("https://youtube.googleapis.com/youtube/v3/activities?part=snippet%2CcontentDetails&channelId=" + channelId + "&maxResults=25&key=" + API_KEY, function (data) {
                $scope.$apply(() => {
                    $scope.AssetData = data.items;
                });
            });
        }

        $scope.Play = function (uri) {
            $scope.videoID = uri;
            $scope.OpenPopup('player');
            var player = ngYoutubeEmbedService.getPlayerById('bytelYtPlayer'); // Get iframe player instance
        }

        $scope.playerReady = function (event) {
            event.target.playVideo();
            console.log(event);
        };

    })
    .controller('PlaylistCtrl', function ($scope, $stateParams) {
    }).directive('ngFocus', function ($timeout) {
    return {
        link: function (scope, element, attrs) {
            scope.$watch(attrs.ngFocus, function (val) {
                if (angular.isDefined(val) && val) {
                    $timeout(function () {
                        element[0].focus();
                    });
                }
            }, true);

            element.bind('blur', function () {
                if (angular.isDefined(attrs.ngFocusLost)) {
                    scope.$apply(attrs.ngFocusLost);

                }
            });
        }
    };
});
 
