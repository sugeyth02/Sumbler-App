class AuthorElements {
  selectOption(author) {
    return `<option class='select__option' value='${author.id}'>${author.name} ${author.lastName}</option>`;
  }
}

export { AuthorElements };
