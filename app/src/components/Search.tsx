import React, { Component, createRef } from 'react';

import { SearchInput, Search as SearchDiv } from '../styles';

class Search extends Component {
  private search: any = createRef();

  searchProfile(event: any) {
    event.preventDefault();

    const searchValue = this.search.value;

    if (!searchValue) {
      return;
    }

    if (searchValue.length < 3 || searchValue.length > 15) {
      return;
    }

    window.location.assign(`/profile/${searchValue}`);
  };

  render() {
    return (
      <SearchDiv>
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
      </SearchDiv>
    );
  };
}

export default Search;