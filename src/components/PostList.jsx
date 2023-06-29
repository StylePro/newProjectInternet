import React from 'react';
import PostItems from "./PostItems";
import {CSSTransition, Transition, TransitionGroup} from "react-transition-group";

const PostList = ({posts, remove}) => {
    if (!posts.length) {
        return <h1 style={{textAlign: "center"}}>Список пуст</h1>
    }
    return (
        <div>
            <h1 style={{textAlign: "center"}}>Список постов</h1>
            <TransitionGroup>
                {posts.map((post, index) =>
                    <CSSTransition
                        key={post.id}
                        timeout={500}
                        classNames="post"
                    >
                        <PostItems remove={remove} number={index + 1} post={post}/>
                    </CSSTransition>
                )}
            </TransitionGroup>
        </div>
    )
        ;
};

export default PostList;