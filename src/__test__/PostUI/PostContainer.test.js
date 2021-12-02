import "regenerator-runtime/runtime"
import React from 'react'
import renderer from 'react-test-renderer';
import PostContainer from '../../postUI/PostContainer'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

test('Tests PostContainer renders correctly', () => {
    const historyMock = createMemoryHistory()

    const component = renderer.create(
        <Router history={historyMock}>
            <PostContainer />
        </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})