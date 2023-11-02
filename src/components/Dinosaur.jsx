import {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Dinosaur = () => {
    const [dino, setDino] = useState(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()

    const endpoint = `${baseUrl}/dinosaurs/${id}?_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data);
            setDino(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [id])

    //Check for featured or render placeholder
    function getFeaturedImage(dino) {
        if (dino && dino._embedded && dino._embedded['wp:featuredmedia'] && dino._embedded['wp:featuredmedia'][0].source_url) {
            return dino._embedded['wp:featuredmedia'][0].source_url;
        } else {
            return 'https://via.placeholder.com/150'
        }
    } 


    if (loading) {
        return <>Loading...</>
    }

  return (
    <div className='container'>
        <h2>Single Dino:</h2>
        <p>Type: {dino.acf.type}</p>
        <div key={dino.slug} className="post-contianer">
            <h4>{dino.title.rendered}</h4>
            <img src={getFeaturedImage(dino)} alt="Dino Featured Image" />
            <div dangerouslySetInnerHTML={{ __html: dino.content.rendered}}></div>
            <div>Key: {dino.slug}</div>
        </div>
    </div>
  )
}

export default Dinosaur