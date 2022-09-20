import Recommendation from './Recommendation'

const Recommendations = ({recommendations}) => {
    return (
        <section className='container recommendations'>
            {console.log(recommendations)}
            {recommendations.map((recommendation, index) => ( 
                <Recommendation key={index} artist={recommendation.name} coverArtURL={`${recommendation.images[1].url}`} url={recommendation.external_urls.spotify}/>   
            ))}
        </section>
    )
}

export default Recommendations