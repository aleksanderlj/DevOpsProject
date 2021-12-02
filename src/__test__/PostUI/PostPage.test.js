import React from 'react'
import renderer from 'react-test-renderer';
import PostPage from '../../postUI/PostPage'
import { Router } from 'react-router-dom'
import { createMemoryHistory } from 'history'

test('Tests PostPage renders correctly', () => {
    const history = createMemoryHistory();

    const component = renderer.create(
        <Router history={history}>
            <PostPage />
        </Router>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})