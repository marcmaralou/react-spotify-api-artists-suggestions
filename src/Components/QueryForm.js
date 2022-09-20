import { useState } from 'react'

function QueryForm({onSubmit}) {
    const [artist, setArtist] = useState('');

    const sendParams = (e) => {
        e.preventDefault();
        onSubmit({artist});
    }

    return (
        <section className='container form' onSubmit={sendParams}>
            <form>
                <div className='form-control artist'>
                    <input type='text' name='artists' placeholder='Artist' onChange={(e) => {setArtist(e.target.value)}}/>
                </div>
                <input id='submit' type='submit' value='SUBMIT'></input>
            </form>
        </section>
    )
}

export default QueryForm