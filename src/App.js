import React, {useState} from "react";
import './components/styles/App.css'
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostItems from "./components/PostItems";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";

function App() {
    const [posts, setPosts] = useState([
        {id: '1', title: 'Java Script1', body: 'Description1'},
        {id: '2', title: 'Java Script2', body: 'Description2'},
        {id: '3', title: 'Java Script3', body: 'Description3'},
        {id: '4', title: 'Java Script4', body: 'Description4'},
    ])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }
    const removePost = (post) => {
        setPosts([...posts.filter(p => p.id !== post.id)])
    }
    return (
        <div className='App'>
            <PostForm create={createPost}/>
            <PostList posts={posts} remove={removePost}/>
        </div>
    );
}

export default App;
