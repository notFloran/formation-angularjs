/**
 * Created by floran on 20/04/15.
 */


function AlbumsListController($scope, $filter, AlbumsService) {
    AlbumsService.getAll().then(function(albums) {
        $scope.albums = albums;
        $scope.headers = Object.keys(_.first($scope.albums));
    });
    AlbumsService.getGenres().then(function(genres) {
        $scope.genres = genres;
    });
    $scope.search = {};

    $scope.deleteAlbum = function(album) {
        AlbumsService.delete(album);
    }

    $scope.sorter = {
        field: 'title',
        reverse: false,
        sort: function(field) {
            this.field = field;
            this.reverse = !this.reverse;
        }
    }
}

function AlbumsShowController($scope, $stateParams, AlbumsService) {
    AlbumsService.get(parseInt($stateParams.id)).then(function(album) {
        $scope.album = album;
    });
}

function AlbumsNewController($scope, AlbumsService) {
    $scope.album = {};
    AlbumsService.getGenres().then(function(genres) {
        $scope.genres = genres;
    });
    $scope.createAlbum = function(form, album) {
        if(form.$invalid) {
            return;
        }

        AlbumsService.add(album);

        $scope.album = {};
        form.$setPristine();
    }
}

angular.module('app', ['ngRoute', 'ngAnimate', 'ui.router'])
    .config(function($stateProvider, $locationProvider, $urlRouterProvider) {
        $stateProvider
            .state('homepage', {
                url: '/',
                template: '<h1>Welcome</h1>'
            })
            .state('albums', {
                url: '/albums',
                templateUrl: 'views/list.html',
                controller: 'AlbumsListController'
            })
            .state('new_album', {
                url: '/albums/new',
                templateUrl: 'views/new.html',
                controller: 'AlbumsNewController'
            })
            .state('show_album', {
                url: '/albums/:id',
                templateUrl: 'views/show.html',
                controller: 'AlbumsShowController'
            })
            .state('show_album.informations', {
                url: '/informations',
                templateUrl: 'views/show_informations.html'
            })
            .state('show_album.tracks', {
                url: '/tracks',
                templateUrl: 'views/show_tracks.html'
            });

        $urlRouterProvider.otherwise("/");

        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode(false);
    })
    .controller('AlbumsListController', AlbumsListController)
    .controller('AlbumsShowController', AlbumsShowController)
    .controller('AlbumsNewController', AlbumsNewController);