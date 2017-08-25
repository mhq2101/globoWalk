import React from 'react'
import { Row, Col, Input } from 'react-materialize';

/* -----------------    COMPONENT     ------------------ */

export default class Gain extends React.Component {
  render() {
    const { node, adjustGainValue } = this.props
    return (
      <div>
        <Row>
          <Col m={4} s={12}>
            <h5>Volume</h5>
            <h5 className="tucked-list">
              <form>
                <Input id="gain" s={12} type="range" defaultValue=".5" step=".01" min='0' max='1' onInput={(evt) => adjustGainValue(node, evt)}></Input>
                {/* <input type="range" id="gain" defaultValue=".5" step=".01" min='0' max='1' onInput={(evt) => adjustGainValue(node, evt)}></input> */}
              </form>
            </h5>
          </Col>
        </Row>
      </div>
    )
  }
}
