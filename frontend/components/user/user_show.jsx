import React from 'react';
import PopoutSidebar from '../main/popout_sidebar';
import SideBar from '../main/sidebar/sidebar_content';
import UserUploadedVids from './user_uploaded_vids_item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Videos from './videos';
import '../../font_awesome';
import SubsList from './subs';
import UserSub from '../main/subscriptions/subs';
import dateConverter from '../../util/date_converter';

class UserShow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            avatar: null,
            avatarUrl: null,
            videos: false,
            about: false,
            home: true
        }
        this.toggleSide = this.toggleSide.bind(this);
        this.uploadAvatar = this.uploadAvatar.bind(this);
        this.toggleTabs = this.toggleTabs.bind(this);
    }

    componentDidMount() {
        // debugger
        this.props.fetchUsers().then(() => {
            this.props.fetchUser(this.props.match.params.id).then(() => {
                this.props.fetchVideos().then(() => {
                    this.props.fetchSubscription(this.props.currentUser, this.props.user.id).then(() => {
                        this.props.fetchSubscriptions(this.props.currentUser).then(() => {
                            this.toggleSide();
                        })
                    })
                })
            })
        })
    }

    uploadAvatar(e) {
        const file = e.target.files[0];
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            this.setState({
                avatar: file,
                avatarUrl: fileReader.result
            })
        }
        if(file) {
            fileReader.readAsDataURL(file);
            this.handleSubmit();
        }
    }

    handleSubmit() {
        const user = new FormData();
        const id = this.props.match.params.id;
        this.state.avatar.name ? user.append('user[avatar]', this.state.avatar) : user.append('user[avatar]', "");
        // debugger
        this.props.processAvatar(user, id).then(() => {
            window.location.href = `/#/users/1`;
        }, errors => {
            this.setState({
                errors: errors.errors
            })
        })
    }

    toggleSide() {
        const popbar = document.getElementsByClassName("pop")[0];
        const button = document.getElementById("side-bar-pop");
        const user = document.getElementsByClassName("user-main")[0];
        const sidebar = document.getElementsByClassName("sidebar")[0];

        button.onclick = function() {
            if(popbar.style.display == "flex" || popbar.style.display == "block") {
                popbar.style.display = "none";
                user.style.marginLeft = "4.02%";
                sidebar.style.display = "flex";
            } else {
                sidebar.style.display = "none";
                popbar.style.display = "block";
                user.style.marginLeft = "12.6%";
            }
        }
    }

    toggleTabs(field) {
        if(field === 'home') {
            this.setState({
                [field]: true,
                videos: false,
                about: false
            })
        } else if (field === 'about') {
            this.setState({
                [field]: true,
                videos: false,
                home: false
            })
        } else {
            this.setState({
                [field]: true,
                home: false,
                about: false
            })
        }
    }

    render() {
        let use;
        let vids = [];
        let subs = [];
        let show;
        let edit_avatar = <FontAwesomeIcon id="edit-avatar" icon="camera" onClick={ () => document.getElementById("avatar-upload").click() }/>
        let edit_avatar2 = <FontAwesomeIcon id="edit-avatar" icon="camera" onClick={ () => document.getElementById("avatar-upload").click() }/>
        if(this.props.user) {
            // debugger
            for(let i = 0; i < this.props.videos.length; i++) {
                if(this.props.videos[i].uploader.id === this.props.user.id) {
                    vids.push(<UserUploadedVids key={ this.props.videos[i].id } history={ this.props.history } vid={ this.props.videos[i] }/>)
                }
            }
            // debugger
            show = vids.slice(0,4)
            if(Object.values(this.props.users).length > 1) {
                for(let j = 0; j < this.props.user.subbed_to.length; j++) {
                    // debugger
                    subs.push(<SubsList key={ this.props.user.subbed_to[j] } channel={ this.props.users[this.props.user.subbed_to[j]] } allProps={ this.props }/>)
                }
            }
            if(this.props.user.id !== this.props.currentUser) {
                use = this.props.currentUser ? 
                    <UserSub id="user-sub" channel={ this.props.user.id } user={ this.props.currentUser } allProps={ this.props }/> : 
                    <span id="subscribe2" onClick={ () => window.location.href = "#/login" }>Login to Subscribe</span>  
            } else {
                use = ""
            }
        }
        return (
            <section className="main-content">
                <PopoutSidebar allProps={ this.props }/>
                <SideBar allProps={ this.props }/>
                <section className="user-main">
                    { this.props.user ? <>
                        <div className="user-header">
                            <div className="user-center-header">
                                <div className="left-header">
                                    { this.props.user.avatar ? 
                                    <div id="hoverme">
                                        { edit_avatar2 }
                                        <img className="user-avatar" src={ `${ this.props.user.avatar }` } onClick={ () => this.props.allProps.history.push(`/users/${ this.props.user.id }`) } />
                                    </div> : 
                                    <span id="avatar">{ this.props.user.username[0] }{ edit_avatar }</span> }
                                    <input id="avatar-upload" type="file" onChange={ this.uploadAvatar }/>
                                </div>
                                <div className="middle-header">
                                    <h1 className="user-username">{ this.props.user.username }</h1>
                                </div>
                                <div className="right-head">
                                    <div className="right-header">
                                        <button>CUSTOMIZE BANNER</button>
                                    </div>
                                    <div className="right-header">
                                        <button onClick={ () => this.props.history.push(`/users/${ this.props.user.id }/videos/edit`) }>MANAGE VIDEOS</button>
                                    </div>
                                </div>
                            </div>
                            <div className="parts-of-header">
                                <li onClick={ () => this.toggleTabs('home') } id="back-home" className={ this.state.home ? "bord" : " "}>Home</li>
                                <li onClick={ () => this.toggleTabs('videos') } id="show-all-vids" className={ this.state.videos ? "bord" : " "}>Videos</li>
                                <li onClick={ () => this.toggleTabs('about') } id="show-stats" className={ this.state.about ? "bord" : " "}>About</li>
                                { use }
                            </div>
                        </div>
                        <section className="user-content">
                            <div className={ this.state.home ? "uploads-section" : "hide" }>
                                <span className="upload-title">Subscriptions</span>
                                <div className="uploads2">
                                    { subs.length > 0 ? subs : "Subscribe to users to see them appear here!" }
                                </div>
                                <span className="upload-title">Uploads</span>
                                <div className="uploads">
                                    { show }
                                </div>
                            </div>
                            <section className={ this.state.videos ? "all-user-vids" : "hide"}>
                                <Videos allProps={ this.props } />
                            </section>
                            <section className={ this.state.about ? "about-section" : "hide"}>
                                <span id="s1">Stats</span>
                                <span id="s2">{ `Joined ${ dateConverter(this.props.user.created_at)}` }</span>
                                <span id="s3">400 views</span>
                            </section>
                        </section> </> : null }
                </section> 
            </section>
        )
    }
}

export default UserShow;
