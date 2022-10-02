import React, { Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

//import AllQuotes from './pages/AllQuotes';
//import QuoteDetail from './pages/QuoteDetail';
//import NewQuote from './pages/NewQuote';
//import NotFound from './pages/NotFound';
import Layout from './components/layout/Layout';
import LoadingSpinner from './components/UI/LoadingSpinner';

//Lazy Load
const MainPage = React.lazy(() => import('./pages/Main'));
const SetupPage = React.lazy(() => import('./pages/Setup'));
const ScorePage = React.lazy(() => import('./pages/Score'));
const GamePage = React.lazy(() => import('./pages/Game'));
const NotFound = React.lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <Layout>
        <Suspense 
            fallback={
            <div className='centered'>
                <LoadingSpinner />
            </div>}>
            <Switch>
                <Route path='/' exact>
                    <Redirect to='/main' />
                </Route>
                <Route path='/main' exact>
                    <MainPage />
                </Route>
                <Route path='/setup' exact>
                    <SetupPage />
                </Route>
                <Route path='/scores' exact>
                    <ScorePage />
                </Route>
                <Route path='/game' exact>
                    <GamePage />
                </Route>
                <Route path='*'>
                <   NotFound />
                </Route>
            </Switch>
        </Suspense>
    </Layout>
  );
}

export default App;
