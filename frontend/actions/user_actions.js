import * as UserApiUtil from '../util/user_api_util';

export const RECEIVE_USER = "RECEIVE_USER";
export const RECEIVE_USERS = "RECEIVE_USERS";
export const RECEIVE_USER_ERRORS = "RECEIVE_USER_ERRORS";

const receiveUser = user => {
    return {
        type: RECEIVE_USER,
        user
    }
}

const receiveUsers = users => {
    return {
        type: RECEIVE_USERS,
        users
    }
}

const receiveUserErrors = errors => {
    return {
        type: RECEIVE_USER_ERRORS,
        errors
    }
}

export const fetchUser = id => dispatch => {
    return UserApiUtil.fetchUser(id).then(user => {
        dispatch(receiveUser(user))
    }, errors => {
        dispatch(receiveUserErrors(errors.responseJSON))
    })
}

export const fetchUsers = () => dispatch => {
    return UserApiUtil.fetchUsers().then(users => {
        dispatch(receiveUsers(users))
    }, errors => {
        dispatch(receiveUserErrors(errors.responseJSON))
    })
}

export const uploadAvatar = (avatar, id) => dispatch => {
    return UserApiUtil.uploadAvatar(avatar, id).then(user => {
        dispatch(receiveUser(user))
    }, errors => {
        dispatch(receiveUserErrors(errors.responseJSON))
    })
}

export const uploadBanner = (banner, id) => dispatch => {
    return UserApiUtil.uploadBanner(banner, id).then(user => {
        dispatch(receiveUser(user))
    }, errors => {
        dispatch(receiveUserErrors(errors.responseJSON))
    })
}
