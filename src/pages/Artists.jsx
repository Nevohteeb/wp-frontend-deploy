import { useState, useEffect} from 'react'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Artists = () => {
    const [loading, setLoading] = useState(true)
    const [artists, setArtists] = useState(null)

    const endpoint = `${baseUrl}/artists`

    console.log({baseUrl}, {endpoint});

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data);
            setArtists(res.data)
            // const loader = setTimeout(() => setLoading(false), 2000)   
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    const Artists = ({artists}) => {
        const mappedArtists = artists.map((artist, index) => {
            return (
                <div key={artist.slug + "-" + index} className="artists-container">
                    <h4 className="title">{artist.title.rendered}</h4>
                    <div dangerouslySetInnerHTML={{ __html: artist.content.rendered }} />
                    <div>Key: {artist.slug + "-" + index}</div>
                    <li key={artist.slug + "-" + index}>
                         <a href={`#/artists/${artist.id}`}>Read More...</a>
                    </li>
                </div>
            )
        })

        return (
            <>
            {mappedArtists}
            </>
        )
    }

  return (
    <div>
      <h2>Artists:</h2>
      <div id="homeCont">
        {loading ? <p>Loading...</p> : <Artists artists={artists} />}
      </div>
    </div>
  )
}

export default Artists
