import React from 'react'
import renderer from 'react-test-renderer';
import PostCard from '../../postUI/PostCard'

test('Tests commentList renders correctly', () => {
    const component = renderer.create(
        <PostCard postId={2}
        title="title"
        description="description"
        date={1234}
        imageLink="image.link"
        commentCount={2}
        shitCount={2} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})