import React from 'react'
import renderer from 'react-test-renderer';
import CommentsList from '../../postUI/CommentsList'

test('Tests commentList renders correctly', () => {
    const component = renderer.create(
        <CommentsList />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})