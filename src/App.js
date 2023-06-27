import React, {useMemo, useState} from "react";
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
    const [selectedSort, setSelectedSort] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    const sortedPost = useMemo(()=> {
        if (selectedSort) {
            return [...posts].sort((a, b)=> a[selectedSort].localeCompare(b[selectedSort]))
        }
        return posts
    }, [selectedSort, posts]);

    const sortedPostAndSelectedSort = useMemo(()=> {
        return sortedPost.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }, [sortedPost, searchQuery])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
    }
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    const sortPost = (sort)=> {
        setSelectedSort(sort)
    }
    return (
        <div className='App'>
            <PostForm create={createPost}/>
            <hr style={{margin: '15px 0'}}/>
            <MyInput
            placeholder = 'Поиск...'
            value={searchQuery}
            onChange = {e => setSearchQuery(e.target.value)}
            />
            <MySelect
                value={selectedSort}
                onChange={sortPost}
                defaultValue='Сортировать'
                options={[
                    {value: 'title', name: 'По названию'},
                    {value: 'body', name: 'По описанию'},
                ]}
            />
            {sortedPostAndSelectedSort.length
                ?
                <PostList posts={sortedPostAndSelectedSort} remove={removePost}/>
                : <h1 style={{textAlign: "center"}}>Список пуст</h1>
            }
        </div>
    );
}

export default App;
