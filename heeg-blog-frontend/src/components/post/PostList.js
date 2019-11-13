import React from 'react';
import styled from 'styled-components';
import Responsive from '../common/Responsive';
import Button from '../common/Button';

const PostListBlock = styled(Responsive)`
    margin-top: 3rem;
`;

const WritePostButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-bottom: 3rem;
`;

const PostItemBlock = styled.div``;

const SubInfo = styled.div``;

const Tags = styled.div``;

const PostItem = () => {
    return (
        <PostItemBlock>
            <h2>Title</h2>
            <SubInfo>
                <span><b>username</b></span>
                <span>{new Date().toLocaleDateString()}</span>
            </SubInfo>
            <Tags>
                <div className="tag">#tag1</div>
                <div className="tag">#tag2</div>
            </Tags>
            <p>A quick view...</p>
        </PostItemBlock>
    );
};

const PostList = () => {
    return (
        <PostListBlock>
            <WritePostButtonWrapper>
                <Button cyan to="/write">
                    Write
                </Button>
            </WritePostButtonWrapper>
            <div>
                <PostItem />
                <PostItem />
                <PostItem />
            </div>
        </PostListBlock>
    );
};

export default PostList;