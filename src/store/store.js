import { configureStore } from '@reduxjs/toolkit'
import {
    persistStore,
    persistReducer,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'

// root-reducer
import { rootReducer } from './root-reducer'

let persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cart']
}

let persistedReducer = persistReducer(persistConfig, rootReducer)

// let middlewares = [process.env.NODE_ENV !== 'production' && logger].filter(Boolean)

export let store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableStateInvariant: false,
        serializableStateInvariant: false,
        serializableCheck: false,
        immutableCheck: false

    }).concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
})

export let persistor = persistStore(store);

