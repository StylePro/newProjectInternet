import React from 'react';
import PostItems from "./PostItems";

const PostList = ({posts, remove}) => {
    return (
        <div>
            <h1 style={{textAlign: "center"}}>Список постов</h1>
            {posts.map((post, index) => <PostItems remove={remove} number={index + 1} key={post.id} post={post}/>)}
        </div>
    );
};

export default PostList;