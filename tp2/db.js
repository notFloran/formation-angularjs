module.exports = function() {

  var Chance = require('chance'),
      chance = new Chance();
  var _ = require('lodash');

  data = {
    albums: [],
    tracks: [],
    genres: ['Rock', 'Jazz', 'Classic']
  };

  for (var i = 0; i < 20; i++) {
    data.albums.push({
      'id': parseInt(_.uniqueId()),
      'title': chance.sentence({words: 2}),
      'releaseDate': chance.date(),
      'description': chance.paragraph(),
      'artist': {
        'id': parseInt(_.uniqueId()),
        'name': chance.name(),
        'email': chance.pick(['n.hart@hexanet.fr', 'f.brutel@hexanet.fr'], 1)//chance.email()
      },
      'tracksCount': chance.integer({min: 5, max: 25}),
      'duration': chance.integer({min: 1, max: 120}),
      'isLive': chance.bool(),
      'genre': chance.pick(data.genres, 1)
    });
  }

  _.forEach(data.albums, function(album) {
    for (var i = 0; i < _.random(10, 25); i++) {
      data.tracks.push({
        'id': parseInt(_.uniqueId()),
        'title': chance.sentence({words: 2}),
        'albumId': album.id,
        'duration': chance.integer({min: 1, max: 5})
      });
    }
  })

  return data
}
