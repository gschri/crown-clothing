import { createAction,withMatcher,Action,ActionWithPayload} from '../../utils/reducer/reducer.utils'
import { USER_ACTION_TYPES } from "./user.types";
import { AdditionalInformation, UserData } from '../../utils/firebase/firebase.utils';
import { User } from 'firebase/auth';

export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER,UserData>

export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>

export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START,{email: string,password: string}>

export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS,UserData>

export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED,Error>

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START,{email: string,password: string,displayName: string}>

export type SignUpSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_SUCCESS,{user: User,additionalDetails: AdditionalInformation}>

export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILED,Error>

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>

export type SignOutSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>

export type SignOutFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED,Error>


export let setCurrentUser = withMatcher((user: UserData): SetCurrentUser => 
    createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)
)

export let checkUserSession = withMatcher((): CheckUserSession => 
    createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
)

export let googleSignInStart = withMatcher((): GoogleSignInStart => 
    createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
)

export let emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart => 
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password })
)
export let signInSuccess = withMatcher((user: UserData & {id: string}): SignInSuccess => 
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
)
export let signInFailed = withMatcher((error: Error): SignInFailed => 
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
)
export let signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart => 
    createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName })
)

export let signUpSuccess = withMatcher((user: User, additionalDetails: AdditionalInformation): SignUpSuccess => 
    createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })
)

export let signUpFailed = withMatcher((error: Error): SignUpFailed => 
    createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error)
)

export let signOutStart = withMatcher((): SignOutStart => 
    createAction(USER_ACTION_TYPES.SIGN_OUT_START)
)

export let signOutSuccess = withMatcher((): SignOutSuccess => 
    createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
)

export let signOutFailed = withMatcher((error: Error): SignOutFailed => 
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
)