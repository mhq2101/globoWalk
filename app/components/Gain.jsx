import React from 'react'

/* -----------------    COMPONENT     ------------------ */

export default class Gain extends React.Component {
  render() {
    const { node, adjustGainValue } = this.props
    return (
            <div>
                <div className="row">
                  <div className="col s4">
                    <h4> Volume Doe </h4>
                    <h5 className="tucked-list">
                        <form>
                        <input type="range" id="gain" defaultValue=".5" step=".01" min='0' max='1' onInput={(evt) => adjustGainValue(node, evt) }></input>
                        {/*<input id="ex1" data-slider-id='ex1Slider' data-slider-min="0" data-slider-max="100" data-slider-step=".01" data-slider-value="50" onInput={(evt) => adjustGainValue(node, evt)}/>*/}
                        </form>
                        {/*<span> Gain: {node.gain.value} dB | </span>*/}
                    </h5>
                    </div>
                </div>
            </div>
    )
  }
}
