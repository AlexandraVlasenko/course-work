// /client/App.js
import React, { Component } from 'react'
import axios from 'axios'
import styled, { createGlobalStyle } from 'styled-components/macro'
import { BrowserRouter as Router, Route } from 'react-router-dom'

class List extends Component {
  // initialize our state
  state = {
    data: [],
    id: 0,
    message: null,
    intervalIsSet: false,
    idToDelete: null,
    idToUpdate: null,
    objectToUpdate: null,
  }

  // when component mounts, first thing it does is fetch all existing data in our db
  // then we incorporate a polling logic so that we can easily see if our db has
  // changed and implement those changes into our UI
  componentDidMount() {
    this.getDataFromDb()
    if (!this.state.intervalIsSet) {
      let interval = setInterval(this.getDataFromDb, 1000)
      this.setState({ intervalIsSet: interval })
    }
  }

  // never let a process live forever
  // always kill a process everytime we are done using it
  componentWillUnmount() {
    if (this.state.intervalIsSet) {
      clearInterval(this.state.intervalIsSet)
      this.setState({ intervalIsSet: null })
    }
  }

  // here, in the front end, we use the id key of our data object
  // in order to identify which we want to Update or delete.
  // for our back end, we use the object id assigned by MongoDB to modify
  // data base entries

  // our first get method that uses our backend api to
  // fetch data from our data base
  getDataFromDb = () => {
    fetch('http://localhost:3001/api/getData')
      .then(data => data.json())
      .then(res => this.setState({ data: res.data }))
  }

  // our put method that uses our backend api
  // to create new query into our data base
  putDataToDB = message => {
    let currentIds = this.state.data.map(data => data.id)
    let idToBeAdded = 0
    while (currentIds.includes(idToBeAdded)) {
      ++idToBeAdded
    }

    axios.post('http://localhost:3001/api/putData', {
      id: idToBeAdded,
      message: message,
    })
  }

  // our delete method that uses our backend api
  // to remove existing database information
  deleteFromDB = idTodelete => {
    axios.delete('http://localhost:3001/api/deleteData', {
      data: {
        id: idTodelete,
      },
    })
  }

  // our update method that uses our backend api
  // to overwrite existing data base information
  updateDB = (idToUpdate, updateToApply) => {
    axios.post('http://localhost:3001/api/updateData', {
      id: idToUpdate,
      message: updateToApply,
    })
  }

  render() {
    const { data } = this.state
    return (
      <>
        <Router>
          <Route path="/list">
            <MainWrap>
              <Guestlist>
                <Title>Guest List</Title>

                <Line>
                  {data.length <= 0
                    ? 'NO DB ENTRIES YET'
                    : data.map(dat => (
                        <Point key={data.message}>
                          <Message>
                            <Number /> {dat.id}) <Number />
                            <Name> </Name>
                            {dat.message}
                          </Message>
                        </Point>
                      ))}
                </Line>
              </Guestlist>
              <Functions>
                <div style={{ padding: '10px' }}>
                  <Input
                    type="text"
                    onChange={e => this.setState({ message: e.target.value })}
                    placeholder="Fill the name of the guest"
                  />
                  <Button onClick={() => this.putDataToDB(this.state.message)}>
                    <ButtonText>ADD</ButtonText>
                  </Button>
                </div>
                <div style={{ padding: '10px' }}>
                  <Input
                    type="text"
                    onChange={e =>
                      this.setState({ idToDelete: e.target.value })
                    }
                    placeholder="Write in the number of the guest"
                  />
                  <Button
                    onClick={() => this.deleteFromDB(this.state.idToDelete)}
                  >
                    <ButtonText> DELETE</ButtonText>
                  </Button>
                </div>
                <div style={{ padding: '10px' }}>
                  <Input
                    type="text"
                    onChange={e =>
                      this.setState({ idToUpdate: e.target.value })
                    }
                    placeholder="Write in the number of the guest"
                  />
                  <Input
                    type="text"
                    onChange={e =>
                      this.setState({ updateToApply: e.target.value })
                    }
                    placeholder="Write in the new name of the guest"
                  />
                  <Button
                    onClick={() =>
                      this.updateDB(
                        this.state.idToUpdate,
                        this.state.updateToApply
                      )
                    }
                  >
                    <ButtonText>UPDATE</ButtonText>
                  </Button>
                </div>
              </Functions>
              <GlobalStyles />
            </MainWrap>
          </Route>
        </Router>
      </>
    )
  }
}

export default List

const GlobalStyles = createGlobalStyle`
  body {
    @import url('https://fonts.googleapis.com/css?family=Heebo');
    font-family: 'Heebo', sans-serif;
  }
`

const MainWrap = styled.div`
  display: flex;
  margin-top: 10%;
  margin-left: 10%;
  margin-right: 10%;
  justify-content: space-around;
`
const Line = styled.ul`
  display: flex;
  flex-direction: row;
  width: 50%;
  flex-wrap: wrap;
  justify-content: flex-start;
`
const Point = styled.li`
  list-style: none;
  padding: 10px;
`
const Functions = styled.div`
  display: flex;
  width: 40%;
  flex-direction: column;
`
const Guestlist = styled.div`
  display: flex;
  width: 30%;
  flex-direction: column;
`

const Title = styled.h1``

const Input = styled.input`
  border: 2px solid #fff829;
  padding: 20px;
  width: 55%;
  margin: 10px;
`
const Button = styled.button`
  margin-left: 50px;
  padding: 10px;
  border: none;
  min-width: 100px;
  background-color: #ffff99;
`
const ButtonText = styled.p`
  font-weight: bold;
`
const Message = styled.div`
  display: flex;
`
const Number = styled.span``

const Name = styled.span`
  margin-left: 10px;
`
