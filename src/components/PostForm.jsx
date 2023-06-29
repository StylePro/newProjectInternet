import React, {useState} from 'react';
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";

const PostForm = ({create, setModal}) => {
    const [post, setPost] = useState({title: '', body: ''})

    let addPost = (e) => {
        e.preventDefault()
        create({...post, id: Date.now()})
        setPost({title: '', body: ''})
    };
    return (
        <form>
            <MyInput
                value={post.title}
                placeholder='Заголовок'
                onChange={e => setPost({...post, title: e.target.value})}
            />
            <MyInput
                value={post.body}
                placeholder='Описание'
                onChange={e => setPost({...post, body: e.target.value})}
            />
            <MyButton
                style={{marginTop: 10}}
                onClick={addPost}
            >Создать пост</MyButton>
        </form>
    );
};

export default PostForm;