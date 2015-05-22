(function() {
    'use strict';

    function AlbumsService($http, $q, TracksService) {
        var AlbumsService = {
            'albums':  [],
            'genres': ['Rock', 'Classic']
        };

        AlbumsService.getAll = function() {
            if (AlbumsService.albums.length > 0) {
                return $q.when(AlbumsService.albums);
            }

            return $http.get('/albums').then(function (result) {
                AlbumsService.albums = result.data;

                return AlbumsService.albums;
            });
        }

        AlbumsService.add = function(album) {
            $http.post('/albums', album).
                success(function(data, status, headers, config) {
                    AlbumsService.albums.push(data);

                    return data;
                });
        }

        AlbumsService.delete = function(album) {
            return $http.delete('/albums/' + album.id).then(function () {
                var index = AlbumsService.albums.indexOf(album);
                if (index > -1) {
                    AlbumsService.albums.splice(index, 1);
                }

            })
        }

        AlbumsService.get = function(id) {
            /*var album = _.find(AlbumsService.albums, { 'id': id });

            if(album) {
                return $q.when(album);
            }*/

            return $q.all([
                $http.get('/albums/' + id),
                TracksService.getForAlbum(id)
            ]).then(function(results) {
                var album = results[0].data;
                var tracks = results[1];

                album.tracks = tracks;

                return album;
            });
        }

        AlbumsService.getGenres = function() {
            var deferred = $q.defer();

            localforage.getItem('genres').then(function(value, err) {
                if (value == null) {

                    $http.get('/genres').then(function (result) {
                        localforage.setItem('genres', result.data);

                        deferred.resolve(data);
                    });

                    return;
                }

                deferred.resolve(value);
            });

            return deferred.promise;
        }

        return AlbumsService;
    }

    function TracksService($http) {
        var TracksService = {};

        TracksService.getForAlbum = function(albumId) {
            return $http.get('/albums/' + albumId + '/tracks').then(function (result) {
                return result.data;
            });
        }

        TracksService.get = function(id) {
            return $http.get('/tracks/' + id).then(function (result) {
                return result.data;
            });
        }

        return TracksService;
    }

    angular.module('app')
        .service('TracksService', TracksService)
        .service('AlbumsService', AlbumsService);

})();