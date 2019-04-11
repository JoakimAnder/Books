import React, { Component } from 'react';
import './App.css';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import Dao from './Dao';

export default class App extends Component {
  constructor() {
    super()
    
    this.dao = new Dao()


    this.state = {
      headerVisible: true,
      footerVisible: true,

      bookLayout: "bar",

      sortAsc: true,
      sortCat: "title",
      searchCat: "title",
      searchTerm: "",

      apiKey: this.dao.getKey(),
      bookList: [],
    }

    this.changeState = this.changeState.bind(this)
  }

  changeState(field, change) { // Function to easily edit one field in state
    this.setState(prev => {
      let newState = {}
      for (let e in prev) {
        if(e === field) {
          newState[e] = change(prev[e])
        } else
          newState[e] = prev[e]
      }
      // console.log(`Changed '${field}' to ${newState[field]}`)  // For debugging
      return newState
    })
  }

  allowAccess(targetField) { // Function to allow change of state for a single field 
    return change => this.changeState(targetField, change)
  }

  render() {
    return (
      <div className="App">
        <Header
          visible={this.state.headerVisible} 
          layout={this.state.bookLayout}
          searchCat={this.state.searchCat}
          sortAsc={this.state.sortAsc}
          changeSortAsc={this.allowAccess("sortAsc")}
          changeSortCat={this.allowAccess("sortCat")}
          changeSearchCat={this.allowAccess("searchCat")}
          changeLayout={this.allowAccess("bookLayout")}
          changeSearchTerm={this.allowAccess("searchTerm")}
          get={e => this.get(e)}
        />
        <button onClick={() => this.changeState("headerVisible", e => !e)}>
          <i className={"fas fa-angle-double-"+(this.state.headerVisible?"up":"down")+" fa-2x"}/>
        </button>

        <Main
          books={this.state.bookList}
          layout={this.state.bookLayout}
          searchTerm={this.state.searchTerm}
          searchCat={this.state.searchCat}
          sortCat={this.state.sortCat}
          sortAsc={this.state.sortAsc}
          addBook={(b) => this.addBook(b)}
          editBook={(b) => this.editBook(b)}
          deleteBook={(b) => this.deleteBook(b)}
        />

        <button onClick={() => this.changeState("footerVisible", e => !e)}>
          <i className={"fas fa-angle-double-"+(this.state.footerVisible?"down":"up")+" fa-2x"}></i>
        </button>
        <Footer
          visible={this.state.footerVisible} 
          apiKey={this.state.apiKey}
          requestNewKey={() => this.newKey()}
        />
      </div>
    );
  }

  newKey() {
    this.dao.newApiKey()
      .then(d => {
        if (d.status === "failed")
          console.error("ApiKey was not changed")
        else {
          this.changeState("apiKey", () => this.dao.getKey())
        }
      })
  }

  get() {
    this.dao.get()
      .then(d => {
        (d.status === "failed")
          ? console.error("Request to get books failed.")
          : this.changeState("bookList", () => d)
      })
  }

  addBook(book) {
    this.dao.add(book)
      .then(d => {
        (d.status === "failed")
          ? console.error("Request to add book failed.")
          : this.get()
      })
  }

  editBook(book) {
    this.dao.edit(book)
      .then(d => {
        (d.status === "failed")
          ? console.error("Request to edit book failed.")
          : this.get()
      })
  }

  deleteBook(book) {
    this.dao.remove(book)
      .then(d => {
        (d.status === "failed")
          ? console.error("Request to delete book failed.")
          : this.get()
      })
  } 
}