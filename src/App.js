import React, {useEffect, useMemo, useState} from "react";
import './components/styles/App.css'
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import {usePosts} from "./components/hooks/usePosts";
import Loader from "./components/UI/Loader/Loader";
import {useFetching} from "./components/hooks/useFetching";
import PostService from "./components/API/PostService";
import {getPageCount, getPagesArray} from "./pages";
import Pagination from "./components/pagination";

function App() {
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({query: '', sort: ''})
    const [modal, setModal] = useState(false)
    const sortedPostAndSelectedSort = usePosts(posts, filter.sort, filter.query)
    const [page, setPage] = useState(1);           ////////// 1 кол-во страниц
    const [limit, setLimit] = useState(10)         /////////  2 количество отображаемых постов
    const [totalPages, setTotalPages] = useState(0) //////// 3 всего страниц
                ////////  7 заносим в массив все страницы

    const [fetchPosts, isPostLoading, postError] = useFetching(async () => {
        const responce = await PostService.getAll(limit, page);
        setPosts(responce.data);
        const totalCount = (responce.headers['x-total-count'])///////// 4 запрашиваем сколько всего постов у сервера
        setTotalPages(getPageCount(totalCount, limit))           //////// 6 заносим кол-во отображаемых страниц
    })

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    useEffect(() => {
        fetchPosts()
    }, [page])


    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    }

    function changePage(p) {
        setPage(p)
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
                <h1>Произошла ошибка {postError} </h1>
            }
            {isPostLoading
                ? <div style={{display: "flex", justifyContent: 'center', marginTop: 50}}><Loader/></div>
                : <PostList posts={sortedPostAndSelectedSort} remove={removePost}/>
            }
            <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
        </div>
    );
}

export default App;
