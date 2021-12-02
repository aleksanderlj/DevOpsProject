import React from 'react'
import renderer from 'react-test-renderer';
import SignIn from '../../profileUI/SignIn'

test('Tests SignIn renders correctly', () => {
    const component = renderer.create(
        <SignIn />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})