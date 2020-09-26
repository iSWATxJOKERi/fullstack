import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../font_awesome';
import { Redirect } from 'react-router-dom';

export default (props) => {
    const user = <FontAwesomeIcon icon="user-circle" />
    return(
        <div className="video-clip">
            <img id={ props.video.id } src={ props.video.photoUrl } onClick={ () => <Redirect to={`/videos/${ props.video.id }`}/> } />
            <div className="title-desc">
                <div className="left-part-of-clip-box">{ user }</div>
                <div className="right-part-of-clip-box">
                    <h1>{ props.video.title }</h1>
                    <span>Uploader Name</span>
                    <div className="details">
                        <span>View Count</span>
                        <span>Upload Date</span>
                    </div>
                </div>
            </div>
        </div>
    )
}