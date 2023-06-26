import React, {useState} from "react";
import './components/styles/App.css'
import MyButton from "./components/UI/button/MyButton";
import MyInput from "./components/UI/input/MyInput";
import PostItems from "./components/PostItems";

function App() {
    const [posts, setPosts] = useState([
        {id: '1', title: 'Java Script1', body: 'Description1'},
        {id: '2', title: 'Java Script2', body: 'Description2'},
        {id: '3', title: 'Java Script3', body: 'Description3'},
        {id: '4', title: 'Java Script4', body: 'Description4'},
    ])
    return (
        <div className='App'>
            <h1 style={{textAlign: "center"}}>Список постов</h1>
            <div>
                {posts.map(post => <PostItems key={post.id} post={post}/>)}
            </div>
        </div>
    );
}

export default App;
