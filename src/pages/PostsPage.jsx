import PostCard from '../components/PostCard'
import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
const PostsPage = () => {
    const Data = useSelector(state => state.PostsData)
    return (
        <Container className='PostsPage'>
            {
                Data !== undefined && Data.map((e, i) => (
                    <PostCard
                        key={i}
                        id={e.id}
                        userId={e.author.id}
                        userName={e.author.username}
                        userImg={e.author.profile_image}
                        postImage={e.image}
                        postDate={e.created_at}
                        postTitle={e.title}
                        postDescription={e.body}
                        comments_count={e.comments_count}
                    />
                ))
            }
        </Container>
    )
}
export default PostsPage
