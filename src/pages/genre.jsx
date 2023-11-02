import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const GenreName = ({genre}) => {
    return (
        <>
            <h2>All Artists</h2>
            <h3>Genre: {genre.name}</h3>
        </>
    )
}

const AllArtistsInGenre = ({params}) => {
    const [artists, setArtists] = useState([])
    const endpoint = `${baseUrl}/artists?genre=${params.id}&_embed`
    useEffect(() => {
        axios.get(`${endpoint}`)
            .then((res) => {
                setArtists(res.data)
            })
            .catch((err) => console.log(err))
    }, [endpoint])

    const renderedArtists = artists.map((artist, index) => {
        return (
            <div className="artist-container item-container" key={index}>
                <Link className="artists-link" to={`/artists/${artist.id}`} >
                    <img src={artist._embedded['wp:featuredmedia'][0].source_url} alt={artist.title.rendered} />
                    <h4 className="name">{artist.title.rendered}</h4>
                </Link>
            </div>
        )
    })

    return (
        <>
            {/* return for All Artists In Genre */}
            {renderedArtists}
        </>
    )
}



const ArtistsViaGenres = () => {
    const [genre, setGenre] = useState({})
    const params = useParams();
    // going to build the back button
    const navigate = useNavigate()
    const genreEndpoint = `${baseUrl}/genre/${params.id}`
    // Set the genre variable
    useEffect(() => {
        axios.get(`${genreEndpoint}`)
        .then((res) => {
            setGenre(res.data)
        })
        .catch((err) => console.log(err))
    }, [genreEndpoint])


    // return for Artists Via Genres
    return (
        <div id='artistsViaGenre' className='page-container'>
            <button onClick={() => navigate(-1)}><ArrowLeft />Go Back</button>
            <GenreName />
            <div id='artists-grid' className='grid-container'>
                <AllArtistsInGenre />
            </div>
        </div>
    )
}

export default ArtistsViaGenres