import React from 'react';
import MyButton from "./UI/button/MyButton";

const PostItems = ({post}) => {
    return (
        <div className='post'>
            <div className='post_content'>
                <strong>{post.id}. {post.title}</strong>
                <div>
                    {post.body}
                </div>
            </div>
            <div>
                <MyButton>Удалить</MyButton>
            </div>
        </div>
    );
};

export default PostItems;