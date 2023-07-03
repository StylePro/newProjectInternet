import React, {useEffect, useMemo, useState} from "react";
import './components/styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./components/hooks/usePosts";
import PostService from "./components/API/PostService";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./components/hooks/useFetching";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({query: '', sort: ''})
    const [modal, setModal] = useState(false)
    const sortedPostAndSelectedSort = usePosts(posts, filter.sort, filter.query)
    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll()
        setPosts(response.data)
    })


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    useEffect(() => {
        fetchPosts()
    }, [])


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className='App'>
            <MyButton
                onClick={() => setModal(true)}
            >Создать пользователя</MyButton>
            <MyModal visible={modal} setVisible={setModal}
            >
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            {isPostLoading
                ? <div style={{display: "flex", justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <PostList posts={sortedPostAndSelectedSort} remove={removePost}/>
            }
        </div>
    );
}

export default App;
