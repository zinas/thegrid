var
  React = require('react'),
  data = require('./../../../js/lib/data.js'),
  AreaInformation = require('./../../components/area-information'),
  Hud = require('./../../components/hud'),
  TopNavigation = require('./../../components/top-navigation'),
  Chat = require('./../../components/chat'),
  Map = require('./../../components/map'),
  MoveControls = require('./../../components/move-controls'),
  CombatLog = require('./../../components/combat-log');

var CharacterView = React.createClass({
  getInitialState: function () {
    return {
      character: data('character'),
      user: data('user'),
      fight: {
        attacker: {},
        defender: {},
        log: [],
        winner: '',
        xp: 0,
        dollars: 0
      }
    };
  },
  onResult: function (fight) {
    this.setState({
      character: fight.attacker,
      fight: {
        attacker: fight.attacker,
        defender: fight.defender,
        log: fight.log,
        winner: fight.result.winner,
        xp: fight.result.xp,
        dollars: fight.result.dollars
      }
    });
  },
  onCharacterUpdated: function (character) {
    this.setState({character: character});
  },
  render: function() {
    return (
    <div className="page-container">

      <div className="page-sidebar scroll">
        <Hud onCharacterUpdated={this.onCharacterUpdated} character={this.state.character} />
      </div>

      <div className="page-content">
        <TopNavigation user={this.state.user} />

        <div className="content-frame">
          <div className="content-frame-top">
            <div className="page-title">
              <h2 data-js="frame-title">Explore</h2>
            </div>
          </div>

          <div className="content-frame-right">
            <Chat />
          </div>

          <div className="content-frame-body content-frame-body-left">
            <div className="row">
              <div className="col-md-6 col-lg-4 col-xl-3">
                <Map level={this.state.character.continent} current={this.state.character.location}/>
              </div>
              <div className="col-md-6 col-lg-4 col-xl-3">
                <MoveControls character={this.state.character} onMove={this.onCharacterUpdated} />
              </div>
              <div className="col-md-12 col-lg-4 col-xl-6">
                <AreaInformation
                  character={this.state.character}
                  level={this.state.character.continent}
                  area={this.state.character.location}
                  onResult={this.onResult} />
              </div>
            </div>
            <CombatLog fight={this.state.fight} />

          </div>

        </div>
      </div>
    </div>
    );
  }
});

React.render(<CharacterView />, document.querySelector('#mainMountNode'));