import React from 'react'
import renderer from 'react-test-renderer';
import PostContainer from '../../postUI/PostContainer'

test('Tests commentList renders correctly', () => {
    const component = renderer.create(
        <PostContainer />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})