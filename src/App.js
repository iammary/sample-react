import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as Helpers from './helpers';
import Autosuggest from 'react-autosuggest';

export default class App extends Component {
	constructor( props ) {
		super();
		this.state = { 
			'suggestions' : [],
			'value' : '',
			'search_data' : []
		};
		Helpers.callAPI( 'destinations' )
			.then( this.updateSearchData );
		Helpers.callAPI( 'hotels' )
			.then( this.updateSearchData )
	}

	updateSearchData = ( res ) => {
		this.setState( {
			'search_data' : [ ...this.state.search_data, res ],
			'suggestions' : [ ...this.state.suggestions, res ],
		} );
	}

	onChange = (event, { newValue, method }) => {
		this.setState({
			value: newValue
		});
	};

	onSuggestionsFetchRequested = ({ value }) => {
		this.setState({
			suggestions: Helpers.getSuggestions(this.state.search_data, value)
		});
	};

	onSuggestionsClearRequested = () => {
		this.setState({
			suggestions: this.state.search_data
		});
	};

	render() {
		const { value, suggestions } = this.state;
		const inputProps = {
			'placeholder' : "Type 'the'",
			value,
			'onChange': this.onChange
    };
		return (
			<div className="App">
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h2> Sample React Application </h2>
				</div>
				<Autosuggest 
					multiSection={true}
					suggestions={suggestions}
					onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
					onSuggestionsClearRequested={this.onSuggestionsClearRequested}
					getSuggestionValue={Helpers.getSuggestionValue}
					renderSuggestion={Helpers.renderSuggestion}
					renderSectionTitle={Helpers.renderSectionTitle}
					getSectionSuggestions={Helpers.getSectionSuggestions}
					inputProps={inputProps} />
			</div>
		);
	}
}
