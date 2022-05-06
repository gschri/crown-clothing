import { useEffect, lazy, Suspense, Fragment } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom';
import Spinner from './components/spinner/spinner.component'
import { checkUserSession } from './store/user/user.action'

import { GlobalStyle } from './global.styles'

let Home = lazy(() => import("./routes/home/home.component"))
let Authentication = lazy(() => import('./routes/authentication/authentication.component'))
let Navigation = lazy(() => import('./routes/navigation/navigation.component'))
let Shop = lazy(() => import('./routes/shop/shop.component'))
let Checkout = lazy(() => import('./routes/checkout/checkout.component'))

let App = () => {
  var dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession())
  }, [])

  return (
    <Fragment>
      <GlobalStyle />
      <Suspense fallback={<Spinner />}>
        <Routes>
          <Route path='/' element={<Navigation />}>
            <Route index element={<Home />} />
            <Route path='shop/*' element={<Shop />} />
            <Route path='auth' element={<Authentication />} />
            <Route path='checkout' element={<Checkout />} />
          </Route>
        </Routes>
      </Suspense>
    </Fragment>
  );
};

export default App;