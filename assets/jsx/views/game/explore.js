var
  React = require('React'),
  data = require('./../../../js/lib/data.js'),
  AreaInformation = require('./../../components/area-information'),
  Hud = require('./../../components/hud'),
  TopNavigation = require('./../../components/top-navigation'),
  Chat = require('./../../components/chat'),
  Map = require('./../../components/map'),
  MoveControls = require('./../../components/move-controls');

var CharacterView = React.createClass({
  getInitialState: function () {
    return {
      character: data('character'),
      user: data('user')
    };
  },
  onCharacterUpdated: function (character) {
    this.setState({character: character});
  },
  render: function() {
    return (
    <div className="page-container">

      <div style={{height: '852px'}} className="page-sidebar scroll">
        <Hud character={this.state.character} />
      </div>

      <div className="page-content">
        <TopNavigation user={this.state.user} />

        <div className="content-frame">
          <div className="content-frame-top">
            <div className="page-title">
              <h2 data-js="frame-title">Explore</h2>
            </div>
          </div>

          <div style={{display: 'block', minHeight: '710px'}} className="content-frame-right">
            <Chat />
          </div>

          <div className="content-frame-body content-frame-body-left">
            <div className="row">
              <div className="col-md-6">
                <Map level={this.state.character.continent} current={this.state.character.location}/>
              </div>
              <div className="col-md-6">
                <MoveControls character={this.state.character} onMove={this.onCharacterUpdated} />
                <AreaInformation level={this.state.character.continent} area={this.state.character.location} />
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
    );
  }
});

React.render(<CharacterView />, document.querySelector('#mainMountNode'));