angular.module('engineering-toolbox-bytel.controllers', ['ksSwiper', 'ngRows']).controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // toastr.info('Controlleurs initialisés avec succès', 'Storigin Consulting HR Tool', {timeOut: 5000});
}).controller('HomeCtrl', function ($scope, $http, $ionicPopup, PopupService, $http, $timeout, ngYoutubeEmbedService) {

        $scope.ConsultantSettings = {};

        // const API_BASE_URL =  "https://api.storigin.fr/api";
        const API_BASE_URL =  "http://127.0.0.1:8000/api";

        $.get("https://consulting.storigin.fr/excel/", function (data) {
            $scope.opportunities = data;
        });

        $scope.selectedRegion = { availableOptions : [], selectedOption : {} };
        $scope.selectedExperience = { availableOptions : [], selectedOption : {} };
        $scope.selectedAvailability = { availableOptions : [], selectedOption : {} };
        $scope.selectedProfile ={ availableOptions : [], selectedOption : {} };
        $scope.selectedSpeciality = { availableOptions : [], selectedOption : {} };
        $scope.selectedJob = { availableOptions : [], selectedOption : {} };

        $scope.selectedGrade = { availableOptions : [], selectedOption : {} };
        $scope.selectedSkill = { availableOptions : [], selectedOption : {} };
        $scope.selectedSkillSet = { availableOptions : [], selectedOption : {} };

        $scope.selectedConsultant ={ availableOptions : [], selectedOption : {} };

        $scope.getProfiles = function(){
            $http({
                method: 'GET',
                url: API_BASE_URL +"/profiles",
            }).then(function (response) {
                try {
                    $scope.selectedProfile.availableOptions = response.data.data;
                } catch (e) {
                    console.warn(e);
                }
            });
        };
        
        $scope.getProfiles();

        $scope.getSpecialities = function(){
            $http({
                method: 'GET',
                url: API_BASE_URL +"/specialities",
            }).then(function (response) {
                try {
                    $scope.selectedSpeciality.availableOptions = response.data.data;
                } catch (e) {
                    console.warn(e);
                }
            });
        };
        
        $scope.getSpecialities();

        $scope.getJobs = function(){
            $http({
                method: 'GET',
                url: API_BASE_URL +"/jobs",
            }).then(function (response) {
                try {
                    $scope.selectedJob.availableOptions = response.data.data;
                } catch (e) {
                    console.warn(e);
                }
            });
        };
        
        $scope.getJobs();

        $scope.getExperiences = function(){
            $http({
                method: 'GET',
                url: API_BASE_URL +"/experiences",
            }).then(function (response) {
                try {
                    $scope.selectedExperience.availableOptions = response.data.data;
                } catch (e) {
                    console.warn(e);
                }
            });
        };
        $scope.getExperiences();


        $scope.getAvailabilities = function(){
            $http({
                method: 'GET',
                url: API_BASE_URL +"/availabilities",
            }).then(function (response) {
                try {
                    $scope.selectedAvailability.availableOptions = response.data.data;
                } catch (e) {
                    console.warn(e);
                }
            });
        };
        $scope.getAvailabilities();


        $scope.getRegions = function(){
            $http({
                method: 'GET',
                url: API_BASE_URL +"/regions",
            }).then(function (response) {
                try {
                    $scope.selectedRegion.availableOptions = response.data.data;
                } catch (e) {
                    console.warn(e);
                }
            });
        };
        $scope.getRegions();

        $scope.getGrades = function(){
            $http({
                method: 'GET',
                url: API_BASE_URL +"/grades",
            }).then(function (response) {
                try {
                    $scope.selectedGrade.availableOptions = response.data.data;
                } catch (e) {
                    console.warn(e);
                }
            });
        };
        $scope.getGrades();

        $scope.getSkills = function(){
            $http({
                method: 'GET',
                url: API_BASE_URL +"/skills",
            }).then(function (response) {
                try {
                    $scope.selectedSkill.availableOptions = response.data.data;
                } catch (e) {
                    console.warn(e);
                }
            });
        };
        $scope.getSkills();

        $scope.getSkillSets = function(){
            $http({
                method: 'GET',
                url: API_BASE_URL +"/skillsets",
            }).then(function (response) {
                try {
                    $scope.selectedSkillSet.availableOptions = response.data.data;
                } catch (e) {
                    console.warn(e);
                }
            });
        };
        $scope.getSkillSets();

        $scope.consultant = {};


        $scope.getConsultants = function(){
            $http({
                method: 'GET',
                url: API_BASE_URL +"/consultants",
            }).then(function (response) {
                try {
                    $scope.selectedConsultant.availableOptions = response.data.data;
                } catch (e) {
                    console.warn(e);
                }
            });
        };
        $scope.getConsultants();


        $scope.addRegion = function(){
            if( $scope.ConsultantSettings.region  == undefined )
            {
                toastr.error( 'Message : veuillez saisir une région' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty region");
                return;
            }
            else
            {
                let addNewRegionFormData = new FormData();
                console.log( $scope.ConsultantSettings.region );
                addNewRegionFormData.append( 'title', $scope.ConsultantSettings.region );

                console.log( addNewRegionFormData);
                $http({
                    method:'POST',
                    headers: { "Content-Type" : undefined },
                    url:API_BASE_URL +"/regions",
                    data : addNewRegionFormData
                }).then(function(response){
                    try{
                        $scope.getRegions();
                     }catch (e){

                    }
                })
            }
        }

        $scope.addAvailabilites = function(){
            if( $scope.ConsultantSettings.availability  == undefined )
            {
                toastr.error( 'Message : veuillez saisir une disponibilité' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty availability");
                return;
            }
            else
            {
                let AvailabilityData = new FormData();
                console.log( $scope.ConsultantSettings.availability );
                AvailabilityData.append( 'title', $scope.ConsultantSettings.availability );

                console.log( AvailabilityData );
                $http({
                    method:'POST',
                    headers: { "Content-Type" : undefined },
                    url:API_BASE_URL +"/availabilities",
                    data : AvailabilityData
                }).then(function(response){
                    try{
                        $scope.getAvailabilities();
                     }catch (e){

                    }
                })
            }
        }

        $scope.addExperiences = function(){
            if( $scope.ConsultantSettings.experience  == undefined )
            {
                toastr.error( 'Message : veuillez saisir un experience' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty experience");
                return;
            }
            else
            {
                let ExperienceData = new FormData();
                console.log( $scope.ConsultantSettings.experience );
                ExperienceData.append( 'title', $scope.ConsultantSettings.experience );

                console.log( ExperienceData );
                $http({
                    method:'POST',
                    headers: { "Content-Type" : undefined },
                    url:API_BASE_URL +"/experiences",
                    data : ExperienceData
                }).then(function(response){
                    try{
                        $scope.getExperiences();
                     }catch (e){

                    }
                })
            }
        }

        $scope.addSkill = function(){
            if( $scope.ConsultantSettings.skill  == undefined )
            {
                toastr.error( 'Message : Select Skill' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty skill");
                return;
            }
            else
            {
                let SkillData = new FormData();
                console.log( $scope.ConsultantSettings.skill );
                SkillData.append( 'title', $scope.ConsultantSettings.skill.title );

                var skillType = '';
                if($scope.ConsultantSettings.skill.isSoft === true){
                    skillType='Soft';
                }else{
                    skillType='Core';
                }

                SkillData.append( 'type', skillType );

                $http({
                    method:'POST',
                    headers: { "Content-Type" : undefined },
                    url:API_BASE_URL +"/skills",
                    data : SkillData
                }).then(function(response){
                    try{
                        $scope.getSkills();
                    }catch (e){

                    }
                })
            }
        }

        $scope.addSkillSet = function(){
            console.log( "Selected Skill", $scope.selectedSkill)
        if( $scope.selectedSkill.selectedOption.id  == undefined )
        {
            toastr.error( 'Message : Select Skill' , 'Storigin Consulting', {timeOut: 5000});
            console.error("empty skill");
            return;
        }
        else if( $scope.selectedGrade.selectedOption.id  == undefined )
        {
            console.log( "Selected Grade", $scope.selectedGrade)
            toastr.error( 'Message : Select Grade' , 'Storigin Consulting', {timeOut: 5000});
            console.error("empty grade");
            return;
        }
        else if($scope.ConsultantSettings.skillset == undefined){
            console.log( "Enter Skillset Title")
            toastr.error( 'Message : Enter Skillset Title' , 'Storigin Consulting', {timeOut: 5000});
            console.error("empty Skillset Title");
            return;
        }
        else
        {
            let SkillSetData = new FormData();

            SkillSetData.append( 'title', $scope.ConsultantSettings.skillset );

            SkillSetData.append( 'skill_id', $scope.selectedSkill.selectedOption.id );
            SkillSetData.append( 'grade_id', $scope.selectedGrade.selectedOption.id );

            $http({
                method:'POST',
                headers: { "Content-Type" : undefined },
                url:API_BASE_URL +"/skillsets",
                data : SkillSetData
            }).then(function(response){
                try{
                    $scope.getSkillSets();
                }catch (e){

                }
            })
        }
    }





    /**
         * 
         * Setup Profil :
         * dependencies : Job and Speciality
         * 
         * Todo (only enable Profile if Job and Speciality have been defined in form)
         * ***/

        $scope.ProfileData = new FormData();
        
        $scope.addSpeciality = function(){
            if( $scope.ConsultantSettings.speciality == undefined )
            {
                toastr.error( 'Message : veuillez saisir une specialité' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty speciality");
                return;
            }
            else
            {
                $scope.ProfileData.append( 'title', $scope.ConsultantSettings.speciality );

                $http({
                    method:'POST',
                    headers: { "Content-Type" : undefined },
                    url:API_BASE_URL +"/specialities",
                    data : $scope.ProfileData
                }).then(function(response){
                        $scope.getSpecialities();
                },
                function( response ){
                    toastr.error( 'Message : ' + response.data.message , 'Storigin Consulting', {timeOut: 5000});
                    console.log(response);
                }
                )
            }
        }

        $scope.addJob = function(){
            if( $scope.ConsultantSettings.job == undefined )
            {
                toastr.error( 'Message : veuillez saisir un métier' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty job");
                return;
            }
            else
            {
                $scope.ProfileData.append( 'title', $scope.ConsultantSettings.job );

                $http({
                    method:'POST',
                    headers: { "Content-Type" : undefined },
                    url:API_BASE_URL +"/jobs",
                    data : $scope.ProfileData
                }).then(function(response){
                        $scope.getJobs();
                },
                function( response ){
                    toastr.error( 'Message : ' + response.data.message , 'Storigin Consulting', {timeOut: 5000});
                    console.log(response);
                }
                )
            }        
        }
        

        $scope.addProfiles = function(){            
            if( $scope.ConsultantSettings.profile == undefined )
            {
                toastr.error( 'Message : veuillez saisir un profil' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty profil");
                return;
            }
            else
            {
                $scope.ProfileData.append( 'title', $scope.ConsultantSettings.profile );
                $scope.ProfileData.append( 'job_id', $scope.selectedJob.val.id );
                $scope.ProfileData.append( 'speciality_id', $scope.selectedSpeciality.val.id );
                
                $http({
                    method:'POST',
                    headers: { "Content-Type" : undefined },
                    url:API_BASE_URL +"/profiles",
                    data : $scope.ProfileData
                }).then(function(response){
                        $scope.getProfiles();
                },
                function( response ){
                    toastr.error( 'Message : ' + response.data.message , 'Storigin Consulting', {timeOut: 5000});
                    console.log(response);
                }
                )
            }
        }

        $scope.enableProfile = function(e) {

            console.log($scope.selectedJob.val.id);
            console.log($scope.selectedJob.val.id);

            if( $scope.selectedJob.val.id == undefined || $scope.selectedJob.val.id == ""  || $scope.selectedJob.val.id == null ) {
                toastr.success( 'Message : pensez à ajouter un métier' , 'Storigin Consulting', {timeOut: 5000});   
            }

            else if( $scope.selectedSpeciality.val.id == undefined || $scope.selectedSpeciality.val.id == ""  || $scope.selectedSpeciality.val.id == null   ){
                toastr.success( 'Message : pensez à ajouter une spécialité'  , 'Storigin Consulting', {timeOut: 5000});  
            }
        } 

        $scope.addGrade = function(){
            if( $scope.ConsultantSettings.grade == undefined )
            {
                toastr.error( 'Message : veuillez saisir un métier' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty grades");
                return;
            }
            else
            {
                $scope.ProfileData.append( 'title', $scope.ConsultantSettings.grade );

                $http({
                    method:'POST',
                    headers: { "Content-Type" : undefined },
                    url:API_BASE_URL +"/grades",
                    data : $scope.ProfileData
                }).then(function(response){
                        $scope.getGrades();
                },
                function( response ){
                    toastr.error( 'Message : ' + response.data.message , 'Storigin Consulting', { timeOut: 5000 } );
                    console.log( response );
                }
                )
            }
        }

        /**
         *
         * Setup Consultant
         */



        $scope.addConsultant = function(){
            let ConsultantData = {};
            ConsultantData.name = $scope.consultant.nom;
            ConsultantData.prename = $scope.consultant.prenom;
            ConsultantData.telephone = $scope.consultant.telephone;
            ConsultantData.address = $scope.consultant.adress;
            ConsultantData.salaire = $scope.consultant.salaire;
            ConsultantData.email = $scope.consultant.email;

            ConsultantData.skill_id = $scope.selectedSkill.selectedOption.id;
            ConsultantData.grade_id = $scope.selectedGrade.selectedOption.id;

            ConsultantData.region_id = $scope.selectedRegion.selectedOption.id;
            ConsultantData.profile_id = $scope.selectedProfile.selectedOption.id;

            ConsultantData.experience_id = $scope.selectedExperience.selectedOption.id;
            ConsultantData.availability_id = $scope.selectedAvailability.selectedOption.id;


            if( ConsultantData.name  == undefined )
            {
                toastr.error( 'Message : Enter Name' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty name");
                return;
            }else if( ConsultantData.prename  == undefined )
            {
                toastr.error( 'Message : Enter prename' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty prename");
                return;
            }
            else if( ConsultantData.telephone  == undefined )
            {
                toastr.error( 'Message : Enter telephone' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty telephone");
                return;
            }else if( ConsultantData.address  == undefined )
            {
                toastr.error( 'Message : Enter address' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty address");
                return;
            }
            else if( ConsultantData.salaire  == undefined )
            {
                toastr.error( 'Message : Enter salaire' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty salaire");
                return;
            }
            else if( ConsultantData.skill_id  == undefined )
            {
                toastr.error( 'Message : Select Skill' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty skill");
                return;
            }
            else if( ConsultantData.grade_id  == undefined )
            {
                toastr.error( 'Message : Select Grade' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty grade");
                return;
            }
            else if( ConsultantData.region_id  == undefined )
            {
                toastr.error( 'Message : Select Region' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty region");
                return;
            }
            else if( ConsultantData.profile_id  == undefined )
            {
                toastr.error( 'Message : Select Profile' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty profile");
                return;
            }
            else if( ConsultantData.experience_id  == undefined )
            {
                toastr.error( 'Message : Select Experience' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty experience");
                return;
            }
            else if( ConsultantData.availability_id  == undefined )
            {
                toastr.error( 'Message : Select availability' , 'Storigin Consulting', {timeOut: 5000});
                console.error("empty availability");
                return;
            }
            else
            {
                var ConsultantFormData = new FormData();

                ConsultantFormData.append('test',1234);

                Object.entries(ConsultantData).forEach(([key, value]) => {
                    console.log(key, value)
                    ConsultantFormData.append(key, value);
                });

                $http({
                    method:'POST',
                    headers: { "Content-Type" : undefined },
                    url:API_BASE_URL +"/consultants",
                    data : ConsultantFormData
                }).then(function(response){
                    try{
                        $scope.getConsultants();
                    }catch (e){

                    }
                })
            }
        }

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
 
