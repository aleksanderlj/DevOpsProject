import React from 'react'
import renderer from 'react-test-renderer';
import MyProfile from '../../profileUI/MyProfile'

test('Tests MyProfile renders correctly', () => {
    const component = renderer.create(
        <MyProfile />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})