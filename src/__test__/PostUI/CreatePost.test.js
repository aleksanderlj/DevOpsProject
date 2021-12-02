import React from 'react'
import renderer from 'react-test-renderer';
import CreatePost from '../../postUI/CreatePost'

test('Tests commentList renders correctly', () => {
    const component = renderer.create(
        <CreatePost newPostSubmitted={() => console.log("hej")} />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})