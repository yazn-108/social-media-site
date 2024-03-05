import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import PostsPage from './pages/PostsPage'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import ProfilePage from './pages/ProfilePage'
import { useEffect, useState } from 'react'
import CommentsPage from './pages/CommentsPage'
import ErrorPage from './pages/ErrorPage'
const App = () => {
  useSelector(state => state.LogInState)
  const [pageNum, setPageNum] = useState(1)
  const posts = useSelector(state => state.PostsData)
  const dispatch = useDispatch()
  useEffect(() => {
    axios.get(`https://tarmeezacademy.com/api/v1/posts?limit=15&page=${pageNum}`).then(response => {
      pageNum <= response.data.meta.last_page &&
        posts
        ? dispatch({ type: "posts", data: [...posts, ...response.data.data] })
        : dispatch({ type: "posts", data: response.data.data })
    })
  }, [pageNum])
  window.addEventListener('scroll', () => {
    if (window.location.pathname === "/social-media-site") {
      window.innerHeight + Math.round(window.scrollY) >= document.body.offsetHeight && setPageNum(pageNum + 1)
    }
  })
  return (
    <BrowserRouter basename='/social-media-site'>
      <NavBar />
      <Routes>
        <Route path='*' element={<ErrorPage />} />
        <Route path='/' element={<PostsPage />} />
        <Route path='/profile' element={localStorage.getItem("token") ? <ProfilePage /> : <Navigate to={"/"} />} />
        <Route path='/Comments' element={<CommentsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
