import { useState, useEffect } from 'react';
import QueryForm from './Components/QueryForm';
import Recommendations from './Components/Recommendations';
import axios from 'axios';
import img from './Images/Spotify-logo.png'

function App() {
    const [token, setToken] = useState('');
    const [artistID, setArtistID] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [searchParams, setParams] = useState({})

    const fetchRecommendations = (paramsObj) => { 
        setParams(paramsObj);
    }

    const CLIENT_ID = '6ea5313de8814f418704ea9690691940'
    const CLIENT_SECRET = '3c8880233c5f4dcd803cea950d72a28e'

    useEffect(() => {
        let artist = searchParams.artist;
        let searchLimit = 1;
        let tempAID = '';
        let tempToken = '';

        if (artist != null) {
            setRecommendations([]);
            setArtistID('');
            setToken('');

            axios('https://accounts.spotify.com/api/token', {
                headers: {
                    'Content-Type' : 'application/x-www-form-urlencoded',
                    'Authorization' : 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)      
                },
                data: 'grant_type=client_credentials',
                method: 'POST'
            })
                .then(tokenResponse => {
                    setToken(tokenResponse.data.access_token);
                    tempToken = tokenResponse.data.access_token;
                    return axios(`https://api.spotify.com/v1/search?q=${artist}&type=artist&market=US&limit=${searchLimit}`, {
                        method: 'GET',
                        headers: {'Authorization' : 'Bearer ' + tempToken}
                    })
                })
                .catch((error) => {
                  console.error(error);
                })
                .then(response => {
                    setArtistID(response.data.artists.items[0].id);
                    tempAID = response.data.artists.items[0].id;       

                    return axios(`https://api.spotify.com/v1/artists/${tempAID}/related-artists`, {
                        method: 'GET',
                        headers: {'Authorization' : 'Bearer ' + tempToken}
                    })
                })
                .catch((error) => {
                  console.error(error);
                })
                .then(response => {
                    setRecommendations(response.data.artists)
                    return
                })
                .catch((error) => {
                    console.error(error);  
                })
        }
    },
    
    [searchParams])

  return (
    <div className="App">
      <h1><a href='https://open.spotify.com/' target="_blank" rel="noreferrer"><img style={{width: 30, height: 30,}} src={img} alt='logo'/> Spotify</a> Artist Suggestions</h1>
      <QueryForm onSubmit = {fetchRecommendations}/>
      <Recommendations recommendations={recommendations}/>
    </div>
  );
} 

export default App;