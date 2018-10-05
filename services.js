
    // data loaded from: http://jsonplaceholder.typicode.com/
    // datatypes: /users, /photos, /albums
    // e.g. photos?albumId=
    // e.g. albums?userId=

    function getUserData(type, callback) {
        $.ajax({
            url: 'http://jsonplaceholder.typicode.com/' + type, 
            success: function(data){
                callback(data);
            },
            complete: function(data) {

            }
        });
    }

    function getAlbumData(id, callback) {
        $.ajax({
            url: 'http://jsonplaceholder.typicode.com/albums?userId=' + id, 
            success: function(data){
                getAlbumThumbnailData(data, callback);    
            },
            complete: function(data) {

            },
            async: true
        });
    }

    function getAlbumThumbnailData(albums, callback) {
        for ( let i = 0; i < albums.length; i++ ) {
            let id = albums[i].id;

            $.ajax({
                url: 'http://jsonplaceholder.typicode.com/photos?albumId=' + id, 
                success: function(data){

                    albums[i].thumbnail = data[0].thumbnailUrl;
                    callback(data);    
                },
                complete: function(data) {
    
                },
                async: false
            });
        }

        callback(albums);
    }

    function getPhotoData(id, callback) {
        $.ajax({
            url: 'http://jsonplaceholder.typicode.com/photos?albumId=' + id, 
            success: function(data){
                callback(data);
            },
            complete: function(data) {

            }
        });
    }