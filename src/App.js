import React, {useEffect, useMemo, useState} from "react";
import './components/styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./components/hooks/usePosts";
import axios from "axios";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({query: '', sort: ''})
    const [modal, setModal] = useState(false)
    const sortedPostAndSelectedSort = usePosts(posts, filter.sort, filter.query)


    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    useEffect(()=> {
        console.log('Отработала')
        fetchPosts()
    }, [])
   async function fetchPosts() {
        const responce = await axios.get('https://jsonplaceholder.typicode.com/posts')
        setPosts(responce.data)
    }

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className='App'>
            <MyButton
            onClick = {()=> setModal(true)}
            >Создать пользователя</MyButton>
            <MyModal visible={modal} setVisible={setModal}
            >
                <PostForm create={createPost}/>
            </MyModal>
            <hr style={{margin: '15px 0'}}/>
            <PostFilter filter={filter} setFilter={setFilter}/>
            <PostList posts={sortedPostAndSelectedSort} remove={removePost}/>
        </div>
    );
}

export default App;
