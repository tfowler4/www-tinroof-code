
    function updateUserList(data) {
        this.setState({
            users: data
        });
    }

    function updateAlbumList(data) {
        this.setState({
            albums: data
        });
    }

    function updatePhotoList(data) {
        this.setState({
            photos: data
        });
    }

    function displayFullSizePhoto(url, title) {
        this.setState({
            url: url,
            title: title
        });        
    }

    class App extends React.Component {
        constructor(props) {
            super(props);

            this.getUserBtnClick = this.getUserBtnClick.bind(this);
        }

        getUserBtnClick(e) {
            getUserData('users', updateUserList);
        }

        render() {
            const rowStyle = {
                marginTop: '20px'
            }

            return (
                <div>
                    <div className="row justify-content-center" style={rowStyle}>
                        <div className="col-2 text-center">
                            <button className="btn btn-primary" onClick={this.getUserBtnClick}>Get Users</button>  
                        </div>

                        <div className="col-5">
                            <UserList data={null} />            
                        </div>
        
                        <div className="col-5">
                            <AlbumList data={null} />   
                        </div>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-12">
                            <PhotoList data={null} />
                        </div>
                    </div>

                   <div className="row justify-content-center">
                        <div className="col-12">
                            <LargeThumbnail data={null} />
                        </div>
                    </div>
                </div>
            );
        }
    }

    class UserList extends React.Component {
        constructor(props) {
            super(props);

            this.state = { users : null };

            updateUserList = updateUserList.bind(this);

            this.createUserList = this.createUserList.bind(this);
            this.getAlbumBtnClick = this.getAlbumBtnClick.bind(this);
        }

        getAlbumBtnClick(userId) {
            getAlbumData(userId, updateAlbumList);
        }

        createUserList() {
            var usersList = [];

            if ( this.state.users != null ) {
                for (let i = 0; i < this.state.users.length; i++) {
                    const userName = this.state.users[i].name;
                    const userId   = this.state.users[i].id;

                    usersList.push(<a key={userId} className="list-group-item list-group-item-action" onClick={() => this.getAlbumBtnClick(userId)}>{userName}</a>);
                }
            }

            return usersList;
        }

        render() {
            const listGroupStyle = {
                marginBottom: '10px'
            };

            if ( this.state.users == null || this.state.users.length == 0 ) {
                return (
                    <ul className="list-group" style={listGroupStyle}>
                        <li className="list-group-item">Nothing Here!</li>
                    </ul>
                );
            } else {
                return (
                    <ul className="list-group" style={listGroupStyle}>{this.createUserList()}</ul>
                );
            }
        }
    }

    class AlbumList extends React.Component {
        constructor(props) {
            super();

            this.state = { albums : null };

            updateAlbumList = updateAlbumList.bind(this);

            this.createAlbumList = this.createAlbumList.bind(this);
            this.getPhotoBtnClick = this.getPhotoBtnClick.bind(this);
        }

        getPhotoBtnClick(albumId) {
            getPhotoData(albumId, updatePhotoList);
        }

        createAlbumList() {
            var albumList = [];

            if ( this.state.albums != null ) {
                for (let i = 0; i < this.state.albums.length; i++) {
                    const title     = this.state.albums[i].title;
                    const albumId   = this.state.albums[i].id;
                    const thumbnail = this.state.albums[i].thumbnail;

                    albumList.push(
                        <a key={albumId} className="list-group-item list-group-item-action" onClick={() => this.getPhotoBtnClick(albumId)}>
                            <img src={thumbnail} className="img-thumbnail" /> {title}
                        </a>
                    );
                }
            }

            return albumList;
        }

        render() {
            if ( this.state.albums == null || this.state.albums.length == 0 ) {
                return (
                    <ul className="list-group">
                        <li className="list-group-item">No Albums Here!</li>
                    </ul>
                );
            } else {
                return (
                    <ul className="list-group">
                        <ul className="list-group">{this.createAlbumList()}</ul>
                    </ul>
                );
            }
        }
    }

    class PhotoList extends React.Component {
        constructor(props) {
            super();

            this.state = { photos : null };

            updatePhotoList = updatePhotoList.bind(this);

            this.createPhotoList = this.createPhotoList.bind(this);
        }

        createPhotoList() {
            var photoList = [];

            if ( this.state.photos != null ) {
                for (let i = 0; i < this.state.photos.length; i++) {
                    const title        = this.state.photos[i].title;
                    const photoId      = this.state.photos[i].id;
                    const url          = this.state.photos[i].url;
                    const thumbnailUrl = this.state.photos[i].thumbnailUrl;

                    photoList.push(<Thumbnail title={title} key={photoId} url={url} previewUrl={thumbnailUrl} />);
                }
            }

            return photoList;
        }

        render() {
            if ( this.state.photos != null && this.state.photos.length > 0 ) {
                return (this.createPhotoList() );
            } else {
                return null;
            }
        }
    }

    class Thumbnail extends React.Component {
        constructor(props) {
            super(props);

            this.url       = props.url;
            this.key       = props.key;
            this.thumbnail = props.previewUrl;
            this.title = props.title;
        }

        showFullSizePicture(url, title) {
            displayFullSizePhoto(url, title);
        }

        render() {
            return (
                <img key={this.key} className="img-thumbnail" src={this.thumbnail} onClick={() => this.showFullSizePicture(this.url, this.title)} />
            );
        }
    }

    class LargeThumbnail extends React.Component {
        constructor(props) {
            super(props);

            this.state = { url : null, title: null };

            displayFullSizePhoto = displayFullSizePhoto.bind(this);
        }

        render() {
            if ( this.state.url == null ) {
                return (
                    <div></div>
                );
            } else {
                return (
                    <div>
                        <img className="img-thumbnail" src={this.state.url} />
                        <span>{this.state.title}</span>
                    </div>
                );
            }
        }
    }

    ReactDOM.render(
        <App />,
        document.getElementById('root')
    );
