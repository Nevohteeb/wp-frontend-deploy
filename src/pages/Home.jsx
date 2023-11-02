import { useState, useEffect} from 'react'
import axios from 'axios'
// Import Loading Screen
// import Loading from '../components/Loading'


const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Home = () => {
    const [loading, setLoading] = useState(true)
    const [posts, setPosts] = useState(null)

    const endpoint = `${baseUrl}/posts`

    console.log({baseUrl}, {endpoint});

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data);
            setPosts(res.data)
            // const loader = setTimeout(() => setLoading(false), 2000)   
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    const Posts = ({posts}) => {
        const mappedPosts = posts.map((post, index) => {
            return (
                <div key={post.slug + "-" + index} className="post-container">
                    <h4 className="title">{post.title.rendered}</h4>
                    <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    <div>Key: {post.slug + "-" + index}</div>
                    <li key={post.slug + "-" + index}>
                         <a href={`#/post/${post.id}`}>Read More...</a>
                    </li>
                </div>
            )
        })

        return (
            <>
            {mappedPosts}
            </>
        )
    }

  return (
    <div>
      <h2>Posts:</h2>
      <div id="homeCont">
        {loading ? <p>Loading...</p> : <Posts posts={posts} />}
      </div>
    </div>
  )
}

export default Home
