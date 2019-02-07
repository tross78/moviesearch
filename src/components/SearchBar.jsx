import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './SearchBar.css';

class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            query: ''
        };
    }


    buildPath() {
        if (this.state.query !== '') {
            return '/search/' + this.state.query;
        } else {
            return '';
        }

    }

    postForm(e) {
        this.props.history.push(this.buildPath());
    }

    handleChange(e) {
        this.setState({ query: e.target.value });
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.postForm(e);
        }
    }

    render() {
        return (
            <div className="col-md-4 mt-md-2">
                <div className="input-group">
                    <input placeholder="Search" className="form-control py-2 searchbar-container" type="search" onKeyPress={this.handleKeyPress.bind(this)} onChange={this.handleChange.bind(this)} />
                    <span className="input-group-append pr-1">
                        <a className="btn searchbar-button" href={this.buildPath()}>
                            <i className="fa fa-search"></i>
                        </a>
                    </span>
                </div>
            </div>
        );
    }
}

export default withRouter(SearchBar);