import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import { Navbar } from './app/Navbar';
import PostList from './features/posts/PostsList';
import AddPostForm from './features/posts/AddPostForm';
import SinglePostPage from './features/posts/SinglePostPage';
import EditPostForm from './features/posts/EditPostForm';
import UserList from './features/users/UsersList';
import UserPage from './features/users/UserPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <AddPostForm />
                <PostList />
              </>
            )}
          />
          <Route exact path='/posts/:postId' component={SinglePostPage} />
          <Route exact path='/posts/edit/:postId' component={EditPostForm} />
          <Route exact path='/users' component={UserList} />
          <Route exact path='/users/:userId' component={UserPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
};

export default App;
