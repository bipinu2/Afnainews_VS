angular.module('starter.controllers', [])

.controller('DashCtrl', function ($scope) {
    // Toggle left function for app sidebar
    $scope.toggleLeft = function () {
        $ionicSideMenuDelegate.toggleLeft();
    };

})

.controller('ChatsCtrl', function ($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    }
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
})

.controller('NewsCtrl', function ($scope, $state, News) {
    //$scope.news = News.getPosts('0');
    $scope.heading = "news";
    $scope.items = [];
    $scope.times = 0;
    $scope.postsCompleted = false;
    // load more content function
    $scope.getPosts = function () {
        News.getPosts($scope.times)
		.success(function (posts) {
		    $scope.items = $scope.items.concat(posts.news);
		    News.posts = $scope.items;
		    $scope.$broadcast('scroll.infiniteScrollComplete');
		    $scope.times = $scope.times + 1;
		    if (posts.news.length == 0) {		       
		        $scope.postsCompleted = true;
		    }
		})
		.error(function (error) {
		    $scope.items = [];
		});
    }

    // pull to refresh buttons
    $scope.doRefresh = function(){
        $scope.times = 0 ;
        $scope.items = [];
        $scope.postsCompleted = false;
        $scope.getPosts();
        $scope.$broadcast('scroll.refreshComplete');
    }
    // showing single post
    $scope.readMore = function(index){
        $state.go('tab.post',{
            catId:0,
            offset:$scope.times,
            index:index,
            type:'home'
        });
    }
})

.controller('PostCtrl', ['$scope', 'News', '$stateParams', function ($scope, News, $stateParams) {

    $scope.$on("$stateChangeStart", function () {
        $scope.$root.showExtraButton = false;
    })
    //console.log(NewsApp.posts);
    // getting category id or search param -- 0 in case of home page posts
    $scope.catId = $stateParams.catId;
    $scope.times = parseInt($stateParams.offset);
    $scope.index = parseInt($stateParams.index);
    $scope.type = $stateParams.type;

    $scope.showPost = function (selectedIndex) {
        if (News.posts[selectedIndex]) {
            //$scope.item.image = '';
            $scope.item = News.posts[selectedIndex];
            $scope.heading = $scope.item.title;
            $scope.description = $scope.item.description;
            $scope.$root.showExtraButton = false;
        }
    }
    $scope.showPost($scope.index);

    // post completed flag
    $scope.postsCompleted = false;
    // getting more posts function
    $scope.gettingPosts = false;
    $scope.getPosts = function () {
        if ($scope.gettingPosts == false) {
            $scope.gettingPosts = true;
            if ($scope.type == 'home') {
                News.getPosts($scope.times)
				.success(function (posts) {
				    News.posts = News.posts.concat(posts.news);
				    $scope.times = $scope.times + 1;
				    if (posts.news.length == 0) {
				        $scope.postsCompleted = true;
				        $scope.showErrorToast();
				    } else {
				        $scope.showPost($scope.index);
				    }
				    $scope.gettingPosts = false;
				})
				.error(function (error) {
				    $scope.gettingPosts = false;
				});
            } else if ($scope.type == 'category') {
                News.getPosts($scope.times, $scope.catId)
				.success(function (posts) {
				    News.posts = News.posts.concat(posts.news);
				    $scope.times = $scope.times + 1;
				    if (posts.news.length == 0) {
				        $scope.postsCompleted = true;
				        $scope.showErrorToast();
				    } else {
				        $scope.showPost($scope.index);
				    }
				    $scope.gettingPosts = false;
				})
				.error(function (error) {
				    $scope.gettingPosts = false;
				});
            } else if ($scope.type == 'search') {
                News.searchPosts($scope.catId, $scope.times)
				.success(function (posts) {
				    News.posts = News.posts.concat(posts.news);
				    $scope.times = $scope.times + 1;
				    if (posts.news.length == 0) {
				        $scope.postsCompleted = true;
				        $scope.showErrorToast();
				    } else {
				        $scope.showPost($scope.index);
				    }
				    $scope.gettingPosts = false;
				})
				.error(function (error) {
				    $scope.gettingPosts = false;
				});
            }
        }
    }
    $scope.showErrorToast = function () {

        $scope.$root.showExtraButton = false;
        
    }
    $scope.onSwipeRight = function () {
        //$scope.item.image = '';
        $scope.index = $scope.index - 1;
        if ($scope.index >= 0) {
            $scope.$root.showExtraButton = true;
            $scope.showPost($scope.index)
        } else {
            $scope.index = $scope.index + 1;
        }
    }
    $scope.onSwipeLeft = function () {
        //$scope.item.image = '';
        $scope.index = $scope.index + 1;
        if (News.posts[$scope.index]) {
            $scope.$root.showExtraButton = true;
            $scope.showPost($scope.index)
        } else {
            if ($scope.postsCompleted == false) {
                $scope.$root.showExtraButton = true;
                $scope.getPosts();
            } else {
                $scope.index = $scope.index - 1;
            }
        }
    }

    $scope.openLinkArticle = function () {
        var ref = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
    }

    $scope.shareArticle = function (title, url) {
       window.plugins.socialsharing.share(title, null, null, url)
        
    }

}])

/* recent posts controller */
.controller('CategoriesCtrl', ['$scope', 'News', '$state', function ($scope, News, $state) {
    // setting header -- 
    $scope.heading = "Categories";
    $scope.postsCompleted = false;
    $scope.categories = [];
    // load more content function
    $scope.getCategories = function () {
        News.getCategories()
		.success(function (posts) {
		    $scope.categories = $scope.categories.concat(posts.categories);
		    $scope.postsCompleted = true;
		})
		.error(function (error) {
		    $scope.categories = [];
		    $scope.postsCompleted = true;
		});
    }
}])

/* category posts controller */

 .controller('CategoryCtrl', ['$scope', 'News', '$state', '$stateParams', function ($scope, News, $state, $stateParams) {
    // setting header --
    $scope.categoryName = $stateParams.categoryName;
    $scope.category = parseInt($stateParams.category);
    if ($scope.categoryName) {
        $scope.heading = $scope.categoryName;
    }
    $scope.items = [];
    $scope.times = 0;
    $scope.postsCompleted = false;
    // load more content function
    $scope.getPosts = function () {
        News.getPosts($scope.times, $scope.category)
		.success(function (posts) {
		    $scope.items = $scope.items.concat(posts.news);
		    News.posts = $scope.items;
		    $scope.$broadcast('scroll.infiniteScrollComplete');
		    $scope.times = $scope.times + 1;
		    if (posts.news.length == 0) {
		        $scope.postsCompleted = true;
		    }
		})
		.error(function (error) {
		    $scope.items = [];
		});
    }
    // pull to refresh buttons
    $scope.doRefresh = function () {
        $scope.times = 0;
        $scope.items = [];
        $scope.postsCompleted = false;
        $scope.getPosts();
        $scope.$broadcast('scroll.refreshComplete');
    }
    // showing single post
    $scope.readMore = function (index) {
        $state.go('tab.post', {
            catId: $scope.category,
            offset: $scope.times,
            index: index,
            type: 'category'
        });
    }
 }])

/* About us Controller */
.controller('AboutCtrl', ['$scope', function ($scope) {
}])


.controller('SettingsCtrl', ['$scope', 'SendPush', 'Config', function ($scope, SendPush, Config) {
    $scope.settings = {
        enableFriends: true
    };
    $scope.AndroidAppUrl = Config.AndroidAppUrl;
    $scope.AppName = Config.AppName;

    $scope.pushNot = [];
    $scope.pushNot.pushStatus = false;

    //document.addEventListener("deviceready", function () {
    //    SendPush.getDetails(device.uuid)
    //	.success(function (data) {
    //	    if (data.enable == 'yes') {
    //	        $scope.pushNot.pushStatus = true;
    //	    }
    //	})
    //	.error(function (error) {
    //	    //alert('error'+data)
    //	});
    //});
    $scope.savePushDetails = function () {
        $scope.sendStatus = 'no';
        if ($scope.pushNot.pushStatus == true) {
            $scope.sendStatus = 'yes';
        }
        SendPush.savePushDetails(device.uuid, $scope.sendStatus)
		.success(function (data) {
		    // alert success
		})
		.error(function (error) {
		    //alert('error'+data)
		});
    }

}])

/* Contact us form page */
.controller('ContactCtrl', ['$scope', 'ConfigContact', function ($scope, ConfigContact) {
    //setting heading here
    $scope.user = [];
    // contact form submit event
    $scope.submitForm = function (isValid) {
        if (isValid) {
            cordova.plugins.email.isAvailable(
				function (isAvailable) {
				    window.plugin.email.open({
				        to: [ConfigContact.EmailId],
				        subject: ConfigContact.ContactSubject,
				        body: '<h1>' + $scope.user.email + '</h1><br><h2>' + $scope.user.name + '</h2><br><p>' + $scope.user.details + '</p>',
				        isHtml: true
				    });
				}
			);
        }
    }
}]);
