import React from 'react'
import styled from 'styled-components/macro'
import holiday from '../assets/images/holiday.jpeg'

import { BrowserRouter as Router, Link } from 'react-router-dom'

class Start extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Wrap>
            <RouteBut>
              <Link to="/list">
                <Button>KNOPOCHKA</Button>
              </Link>
            </RouteBut>
          </Wrap>
        </Router>
      </>
    )
  }
}

export default Start

const Wrap = styled.div`
  width: 100%;
  background-image: url(${holiday});
  background-size: cover;
  display: flex;
  position: relative;
  z-index: 2;
`

const Button = styled.button`
  position: relative;
  z-index: 50;
  flex-basis: 30px;
  height: 30px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  margin-left: 776px;
  font-size: 36px;
  outline: none;
`

const RouteBut = styled.div`
  padding-top: 451px;
  padding-bottom: 490px;
`
