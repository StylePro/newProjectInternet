import React, {useState} from "react";
import './components/styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";

function App() {
    const [posts, setPosts] = useState([
        {id: '1', title: 'я', body: 'м'},
        {id: '2', title: 'г', body: 'о'},
        {id: '3', title: 'д', body: 'р'},
        {id: '4', title: 'у', body: 'п'},
    ])
    const [selectedSort, setSelectedSort] = useState('')  // хранит значение выбора

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPost = (sort)=> {
        setSelectedSort(sort)
        setPosts([...posts].sort((a, b)=> a[sort].localeCompare(b[sort])))
    }
    return (
        <div className='App'>
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <MyInput/>
            <MySelect
                value={selectedSort}
                onChange={sortPost}
                defaultValue='Сортировать'
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'},
                ]}
            />
            {posts.length
                ?
                <PostList posts={posts} remove={removePost}/>
                : <h1 style={{textAlign: "center"}}>Список постов пуст</h1>
            }
        </div>
    );
}

export default App;
