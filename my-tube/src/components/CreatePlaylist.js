import React from 'react';
import {store} from '../store/store.js'
import {connect} from 'react-redux';
import {stateMapper} from '../store/store';
import {Redirect} from 'react-router-dom';


class CreatePlaylistComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name : '',
            type : 'public',
            description : '',
            formState : {
                isFormValid : true,
                isNameValid : true,
                isDescriptionValid : true,

            }
        }
        this.onChange=this.onChange.bind(this);
        this.validateForm=this.validateForm.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
    
    onChange(event){
            let name=event.target.name;
            let updatedState={};
            updatedState[name]=event.target.value;
            this.setState(updatedState)
    }

    handleSubmit(event){
        event.preventDefault();

        console.log(this.state)
        store.dispatch({
            type : 'create_playlist',
            formData : this.state
        })
    }
    
    validateForm(){
        if(this.state.name===''){
            this.setState({
                formState : {
                    isNameValid : false
                }
            });
        }
        else
        if(!this.state.description===''){
            this.setState({
                formState : {
                    isDescriptionValid : false
                }
            });
        }else {
            this.setState({
                formState : {
                    isDescriptionValid : true,
                    isNameValid : true,
                    isFormValid : true
                }
            })
        }
    
}
    componentWillUnmount(){
        store.dispatch({
            type : 'clear_playlist_created'
        })
    }
    render(){
            if(this.props.newPlaylist.id){
                return <Redirect to={`/app/playlist/${this.props.newPlaylist.id}`}/>
            }
        return(
            <div>
                <h2 className='text-info'>Create new playlist</h2>
                {
                    !this.state.formState.isFormValid&&
                    <div className='text-danger'>Please fill all the fields and try again</div>
                }

                <hr></hr>
                <form>
                    <div className='form-group'>
                        <label>Playlist Name :
                            <input name='name' 
                                   type='text' 
                                   onChange={this.onChange} 
                                   className={`form-control ${!this.state.formState.isNameValid && 'is-invalid'}`}> 
                            </input>
                        </label>
                    </div>
                    <div className='form-group'>
                        <label>Select Playlist Type :
                        <select name='type' 
                                onChange={this.onChange} 
                                className='form-control'>
                            <option value='public'> Public</option>
                            <option value='private'> Private</option>
                            <option value='unlisted'> unlisted</option>
                        </select>
                        </label>
                    </div>
                    <div className='form-group'>
                        <label>Playlist Description:
                            <textarea  
                                name='description' 
                                onChange={this.onChange} 
                                rows='4' 
                                cols='50' 
                                className={`form-control ${!this.state.formState.isDescriptionValid && 'is-invalid'}`}> 
                            </textarea>
                        </label>
                    </div>
                    <button type='submit' className='btn btn-info' onClick={this.handleSubmit}>Create Playlist</button>
                </form>
            </div>
        )
    }
}

let CreatePlaylist = connect (stateMapper)(CreatePlaylistComponent);
export default CreatePlaylist;