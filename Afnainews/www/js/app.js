// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
// 'starter.directives' is found in directive.js

angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.directives'])

.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider

    // setup an abstract state for the tabs directive
      //.state('tab', {
      //    url: "/tab",
      //    abstract: true,
      //    templateUrl: "templates/tabs.html"
      //})
    //sidebar
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/sidebarmenu.html"
    })

    // Each tab has its own nav history stack:

    .state('tab.dash', {
        url: '/dash',
        views: {
            'menuWorPress': {
                templateUrl: 'templates/dash.html',
                controller: 'DashCtrl'
            }
        }
    })

    .state('tab.chats', {
        url: '/chats',
        views: {
            'menuWorPress': {
                templateUrl: 'templates/chats.html',
                controller: 'ChatsCtrl'
            }
        }
    })
      .state('tab.chat-detail', {
          url: '/chats/:chatId',
          views: {
              'menuWorPress': {
                  templateUrl: 'templates/chat-detail.html',
                  controller: 'ChatDetailCtrl'
              }
          }
      })

    .state('tab.settings', {
        url: '/settings',
        views: {
            'menuWorPress': {
                templateUrl: 'templates/settings.html',
                controller: 'SettingsCtrl'
            }
        }
    })
  // new page
    .state('tab.news', {
        url: '/news',
        views: {
            'menuWorPress': {
                templateUrl: 'templates/news.html',
                controller: 'NewsCtrl'
            }
        }
    })

   // new-detailspage 
       .state('tab.post', {
           url: "/post/:catId/:offset/:index/:type",
           views: {
               'menuWorPress': {
                   templateUrl: "templates/news-detail.html",
                   controller: "PostCtrl"
               }
           }
       })

    // Blog page
    .state('tab.categories', {
        url: "/categories",
        views: {
            'menuWorPress': {
                templateUrl: "templates/categories.html",
                controller: "CategoriesCtrl"
            }
        }
    })
     // Blog page
	 .state('tab.category', {
	     url: "/category/:category/:categoryName",
	     cache: false,
	     views: {
	         'menuWorPress': {
	             templateUrl: "templates/news.html",
	             controller: "CategoryCtrl"
	         }
	     }
	 })

    .state('tab.contact', {
        url: "/contact",
        views: {
            'menuWorPress': {
                templateUrl: "templates/contact.html",
                controller: "ContactCtrl"
            }
        }
    })
	 .state('tab.about', {
	     url: "/about",
	     views: {
	         'menuWorPress': {
	             templateUrl: "templates/about.html",
	             controller: "AboutCtrl"
	         }
	     }
	 })
	 .state('tab.admob', {
	     url: "/admob",
	     views: {
	         'menuWorPress': {
	             templateUrl: "templates/admob.html",
	             controller: "AdmobCtrl"
	         }
	     }
	 })


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/dash');

})

.constant("Config", {
    "WebUrl": 'http://app.afnainews.com/api/',
    "AppName": "Afnai News",
    "AndroidAppUrl": "https://play.google.com/store/apps/details?id=com.afnainews",
    "ErrorMessage": "End of results"
})
// config contact
.constant("ConfigContact", {
    "EmailId": "bipinu23@gmail.com",
    "ContactSubject": "Contact"
})
// config admon
.constant("ConfigAdmob", {
    "interstitial": "ca-app-pub-3940256099942544/1033173712",
    "banner": "ca-app-pub-3940256099942544/6300978111"
})
// color variations
.constant("Color", {
    "AppColor": "balanced", //light, stable, positive, calm, balanced, energized, assertive, royal, dark
})
// push notification
.constant("PushNoti", {
    "senderID": "senderID",
});
