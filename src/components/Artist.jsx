import {useState, useEffect} from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft } from 'react-bootstrap-icons'
import axios from 'axios'

//Import baseUrl env
const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Genres = ({artist}) => {
    const [taxonomies, setTaxonomies] = useState([])

    useEffect(() => {
        if (!artist) {
            return;
        }
        const taxonomyEndpoint = artist._links["wp:term"][0].href;

        axios.get(`${taxonomyEndpoint}`)
        .then((res) => {
            console.log('artist-taxonomy-call');
            setTaxonomies(res.data)
        })
        .catch((err) => console.log(err))
    }, [artist])

    const renderedTaxonomies = taxonomies.map((taxonomy, index) => {
        return (
            <Link to={`/genre/${taxonomy.id}`} key={index}>
                <span className="taxonomy-term-pill">
                    {taxonomy.name}
                </span>
            </Link>
        )
    })

    return (
        <div>
            {renderedTaxonomies}
        </div>
    )
}

const Artist = () => {
    const [artist, setArtist] = useState(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams();

    const navigate = useNavigate();

    const endpoint = `${baseUrl}/artists/${id}?_embed`


    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data)
            setArtist(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    //Check for featured or render placeholder
    function getFeaturedImage(artist) {
        if (artist && artist._embedded && artist._embedded['wp:featuredmedia'] && artist._embedded['wp:featuredmedia'][0].source_url) {
            return artist._embedded['wp:featuredmedia'][0].source_url;
        } else {
            return '<https://via.placeholder.com/150>'
        }
    }

    if (loading) {
        return <>Loading...</>
    }

  return (
    <div className='container'>
        <button onClick={()=>navigate(-1)}><ArrowLeft/>Go Back</button>
      <h2>Single Artitst:</h2>
      <div key={artist.slug} className="post-container">
          <h4 className="title">{artist.title.rendered}</h4>
          <Genres artist={artist}/>
          <img src={getFeaturedImage(artist)} alt="Post Featured Image"/>
          <div dangerouslySetInnerHTML={{ __html: artist.content.rendered }} />
          <div>Key: {artist.slug}</div>
      </div>
    </div>
  )
}

export default Artist
