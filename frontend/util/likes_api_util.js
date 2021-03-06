export const createLike = like => {
    // debugger
    return (
        $.ajax({
            method: 'POST',
            url: `/api/videos/${ like.likeable_id }/likes`,
            data: { like }
        })
    )
}

export const deleteLike = like => {
    // debugger
    return (
        $.ajax({
            method: 'DELETE',
            url: `/api/videos/${ like.likeable_id }/likes/${ like.id }`,
            data: { like } 
        })
    )
}

export const fetchLike = (id, liker_id) => {
    return (
        $.ajax({
            method: 'GET',
            url: `api/videos/${ id }/likes/?liker=${ liker_id }`
        })
    )
}

export const createCommentLike = (like, videoId) => {
    // debugger
    return (
        $.ajax({
            method: 'POST',
            url: `/api/videos/${ videoId }/comments/${ like.likeable_id }/likes`,
            data: { like }
        })
    )
}

export const deleteCommentLike = (like, videoId) => {
    // debugger
    return (
        $.ajax({
            method: 'DELETE',
            url: `/api/videos/${ videoId }/comments/${ like.likeable_id }/likes/${ like.id }`,
            data: { like } 
        })
    )
}

export const fetchCommentLike = (id, video_id) => {
    return (
        $.ajax({
            method: 'GET',
            url:  `/api/videos/${ video_id }/comments/${ id }/likes`
        })
    )
}

