import React from "react";
import './SearchBar.css';
import { connect } from "react-redux";
import { submitSearch, showLoader} from "../../actions"
import { Field, reduxForm } from 'redux-form';
import FA from "react-fontawesome";
import { withRouter } from 'react-router';


const validate = values => {
  const errors = {}
  if (!values.searchTerm) {
    errors.searchTerm = 'Required'
  } else if (values.searchTerm.length < 3) {
    errors.searchTerm = 'Must be 15 characters or less'
  }
  return errors
}

export class SearchBar extends React.Component {
  constructor(props){
    super();
    this.state = {
      test: false
    }
    this.submitNavigate = this.submitNavigate.bind(this);
  }

  submitNavigate(values){
    this.props.showLoader();
    this.props.submitSearch(values.searchTerm);
    this.props.history.push({
      pathname: '/',
      search: '?search='+values.searchTerm
    });
    this.setState({
      test:values.searchTerm
    })
  };

  render(){
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(values => this.submitNavigate(values))}>
          <div className="searchbar__container">

            <Field
              component="input"
              type="text"
              name="searchTerm"
              className="searchbar__searchTerm"
              placeholder="What are you looking for?"
            />
            <button type="submit" className="searchbar__searchButton">
              SEARCH
              <FA className="searchbar__FA" name="search" />

            </button>

          </div>
        </form>
        <span style={{display:"none"}} id="test">{this.state.test}</span>
      </div>
    );

  }
}



export const ReduxForm = reduxForm({
  form: 'search',
  validate,
  destroyOnUnmount: true
})(SearchBar);

export const ReduxHOC = connect(null, {submitSearch, showLoader})(ReduxForm);

export default withRouter(ReduxHOC);
