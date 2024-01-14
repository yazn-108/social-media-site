import { Container } from "react-bootstrap"
import PostCard from "../PostCard"
const UserPosts = ({ userPostsData }) => {
    return (
        <Container style={{ padding: "20px 0" }}>
            {
                userPostsData.length > 0 && userPostsData.map((e, i) => (
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
export default UserPosts
