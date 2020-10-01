import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../../font_awesome';
import dateConverter from '../../../util/date_converter';

export default (props) => {
    const user = <FontAwesomeIcon icon="user-circle" />
    return(
        <div className="video-clip">
            <img id={ props.video.id } src={ props.video.photoUrl } onClick={ () => props.allProps.history.push(`/videos/${ props.video.id }`) } />
            <div className="title-desc">
                <div className="left-part-of-clip-box">{ user }</div>
                <div className="right-part-of-clip-box">
                    <h1>{ props.video.title }</h1>
                    <span>{ props.video.uploader.username }</span>
                    <div className="details">
                        <span>400 views</span>
                        <span id="date" >{ dateConverter(props.video.created_at) }</span>
                    </div>
                </div>
            </div>
        </div>
    )
}