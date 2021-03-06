import MYTUBE_CONFIG from '../../config.js'

function getUserToken(){
    let user = localStorage.getItem('user');
    
    if(!user){return null;}

    user= JSON.parse(user);
    return user.token;
}

function fetchVideos(store, action){
    if(action.videoType==='trending'){

        let url=`https://www.googleapis.com/youtube/v3/videos?part=snippet&key=${MYTUBE_CONFIG.YOUTUBE_API_KEY}&chart=mostPopular&maxResults=30`

        fetch(url)
        .then(function(data){
            return data.json();
        })
        .then(function(response){
            store.dispatch({
                type : 'videos_loaded',
                videos : response.items
            })
        })
        .catch(function(err){
            console.log("fetch error==>",err);
        });
        
    }else if(action.videoType==='search'){
        let url=`https://www.googleapis.com/youtube/v3/search?key=${MYTUBE_CONFIG.YOUTUBE_API_KEY}&q=${action.query}&part=snippet&maxResults=30`;
        
        fetch(url)
        .then(function(data){
            return data.json();
        })
        .then(function(response){
            store.dispatch({
                type : 'videos_loaded',
                videos : response.items
            })
        })
        .catch(function(err){
            console.log("fetch error==>",err);
        });

    }

}

function fetchOneVideo(store,action){
    let url=`https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics
    &id=${action.videoId}
    &key=${MYTUBE_CONFIG.YOUTUBE_API_KEY}`
   
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            store.dispatch({
                type : 'video_data_loaded',
                videos : data.items[0]
            });
        })
        .catch(function(err){
            console.log("fetch error==>",err);
        });
}

function fetchVideoComments(store,action){
    let url=`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies
    &videoId=${action.videoId}
    &key=${MYTUBE_CONFIG.YOUTUBE_API_KEY}`
   
    fetch(url)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
           
            store.dispatch({
                type : 'video_comments_loaded',
                comments : data.items
            });
        })
        .catch(function(err){
            console.log("fetch error==>",err);
        });
}

function fetchPlaylists(store,action){
    let url=`https://www.googleapis.com/youtube/v3/playlists?part=snippet&mine=true&maxResults=30`;
    console.log(getUserToken())
    fetch(url , {
        'headers' : {
            'Authorization' : `Bearer ${getUserToken()}`
        }
    })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
           
            store.dispatch({
                type : 'playlists_loaded',
                playlists : data.items
            });
        })
        .catch(function(err){
            console.log("fetch error==>",err);
        });
}

function createPlaylist(store,action){
    let url=`https://www.googleapis.com/youtube/v3/playlists?part=snippet`;
    
    let token=getUserToken();

    if(!token){return store;}

    let formData={
        'snippet' : {
            'title' : action.formData.name,
            'description' : action.formData.description
        }
    }

    fetch(url , {
        'method'  : 'POST',
        'headers' : {
            'Authorization' : `Bearer ${token}`,
            'content-type'  : 'application/json'
        },
        'body' : JSON.stringify(formData)
    })
        .then(function(response){
            return response.json();
        })
        .then(function(data){
           
            store.dispatch({
                type : 'playlist_created',
                newPlaylist : data
            });
        })
        .catch(function(err){
            console.log("fetch error==>",err);
        });
}

export {fetchVideos,
        fetchOneVideo,
        fetchVideoComments,
        fetchPlaylists,
        createPlaylist};