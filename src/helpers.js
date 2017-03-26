import $ from 'jquery';
import React from 'react';

export function callAPI( url ) {
	let APIurl = `http://demo7978502.mockable.io/${url}`;
	return new Promise( function ( resolve, reject ) {
		$.ajax( {
			'url'      : APIurl,
			'dataType' : 'json',
			'success'  : resolve,
			'error'    : reject
		} );
	} )
}

/* https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters */
export function escapeRegexCharacters(str) {
	return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getSuggestions(data, value) {
	const escapedValue = escapeRegexCharacters(value.trim());
	
	if (escapedValue === '') {
		return [];
	}
	const regex = new RegExp(escapedValue, 'i');

	return data
		.map(section => {
			return {
				'title': section.title,
				'data': section.data.filter(data => regex.test(data.post_title))
			};
		})
		.filter(section => section.data.length > 0);
}

export function getSuggestionValue(suggestion) {
	return suggestion.post_title;
}

export function renderSuggestion(suggestion) {
	return (
		<span>{suggestion.post_title}</span>
	);
}

export function renderSectionTitle(section) {
	return (
		<strong>{section.title}</strong>
	);
}

export function getSectionSuggestions(section) {
	return section.data;
}
