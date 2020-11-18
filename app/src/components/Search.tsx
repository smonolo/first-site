import React, { Component, createRef } from 'react';
import validator from 'validator';

import { allowedUsernameChars } from '../constants';

import { SearchInput } from '../styles';

class Search extends Component {
  private search: any = createRef();

  searchProfile(event: any) {
    event.preventDefault();

    const searchValue: string = validator.unescape(validator.trim(this.search.value));

    if (!searchValue) {
      return;
    }

    if (searchValue.length < 3 || searchValue.length > 15) {
      return;
    }

    if (!searchValue.match(allowedUsernameChars)) {
      return;
    }

    window.location.assign(`/profile/${searchValue}`);
  };

  render() {
    return (
      <form onSubmit={event => this.searchProfile(event)}>
        <SearchInput
          type='text'
          name='search'
          minLength={3}
          maxLength={15}
          placeholder='search user...'
          ref={(input: HTMLInputElement) => this.search = input}
          required
        />
      </form>
    );
  };
}

export default Search;