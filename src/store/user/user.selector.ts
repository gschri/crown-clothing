import { createSelector } from "reselect"
import { RootState } from "../store"
import {UserState} from './user.reducer'

export let selectUserReducer = (state: RootState): UserState => state.user

export let selectCurrentUser = createSelector(
    [selectUserReducer],
    (user) => user.currentUser
)