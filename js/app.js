
angular.module('engineering-toolbox-bytel', ['ionic', 'engineering-toolbox-bytel.controllers', '720kb.tooltips', 'ngYoutubeEmbed' ,'ngRows'])

.run(function($ionicPlatform) {

      SpatialNavigation.init();
      SpatialNavigation.add({
        selector: 'a, .focusable',
        selector: 'button, .focusable'
      });
      SpatialNavigation.makeFocusable();
      SpatialNavigation.focus();


  $ionicPlatform.ready(function() {
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.service("PopupService", ['$ionicPopup', PopupService])
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  }).state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html',
          controller: 'HomeCtrl'
        }
      }
    });
  $urlRouterProvider.otherwise('/app/home');
});
