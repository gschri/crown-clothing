import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
    PersistConfig
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'
import { rootSaga } from './root-saga'
import { Middleware } from 'redux'

// root-reducer
import { rootReducer } from './root-reducer'

export type RootState = ReturnType<typeof rootReducer>

type ExtendedPersistConfig = PersistConfig<RootState> & {
    whitelist: (keyof RootState)[];
}

let persistConfig: ExtendedPersistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

let sagaMiddleware = createSagaMiddleware();

let persistedReducer = persistReducer(persistConfig, rootReducer)

let middlewares = [
    process.env.NODE_ENV !== 'production' && logger,
    sagaMiddleware
].filter((middleware): middleware is Middleware => Boolean(middleware))

export let store = configureStore({
    reducer: persistedReducer,
    middleware: middlewares,
    devTools: process.env.NODE_ENV !== 'production',
})

sagaMiddleware.run(rootSaga)

export let persistor = persistStore(store);

