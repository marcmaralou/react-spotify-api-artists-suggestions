import React from 'react'

function Recommendation({artist, coverArtURL, url}) {

    return (
        <div className='recommendation'>
            <div className='rec-img'><a href={url} target="_blank" rel="noreferrer"><img src={coverArtURL} alt={`${artist}`}></img></a></div>
            <div className='rec-name'>
              <h3 className='artists-name'>{artist}</h3>        
            </div>        
        </div>
    )
}

export default Recommendation