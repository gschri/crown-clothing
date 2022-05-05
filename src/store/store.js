import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'

// root-reducer
import { rootReducer } from './root-reducer'

let persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

let sagaMiddleware = createSagaMiddleware();

let persistedReducer = persistReducer(persistConfig, rootReducer)

let middlewares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware
].filter(Boolean)

export let store = configureStore({
    reducer: persistedReducer,
    middleware: middlewares,
    devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(rootSaga)

export let persistor = persistStore(store);

