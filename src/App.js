import React, {useMemo, useState} from "react";
import './components/styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import MySelect from "./components/UI/select/MySelect";
import MyInput from "./components/UI/input/MyInput";
import PostFilter from "./components/PostFilter";

function App() {
    const [posts, setPosts] = useState([
        {id: '1', title: 'я', body: 'м'},
        {id: '2', title: 'г', body: 'о'},
        {id: '3', title: 'д', body: 'р'},
        {id: '4', title: 'у', body: 'п'},
    ])
    const [filter, setFilter] = useState({query: '', sort: ''})

    const sortedPost = useMemo(()=> {
        if (filter.sort) {
            return [...posts].sort((a, b)=> a[filter.sort].localeCompare(b[filter.sort]))
        }
        return posts
    }, [filter.sort, posts]);

    const sortedPostAndSelectedSort = useMemo(()=> {
        return sortedPost.filter(p => p.title.toLowerCase().includes(filter.query.toLowerCase()))
    }, [sortedPost, filter.query])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    return (
        <div className='App'>
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
           <PostFilter filter={filter} setFilter={setFilter}/>
            {sortedPostAndSelectedSort.length
                ?
                <PostList posts={sortedPostAndSelectedSort} remove={removePost}/>
                : <h1 style={{textAlign: "center"}}>Список пуст</h1>
            }
        </div>
    );
}

export default App;
