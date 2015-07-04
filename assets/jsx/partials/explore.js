var
  React = require('react'),
  AreaInformation = require('../components/area-information'),
  Map = require('../components/map'),
  MoveControls = require('../components/move-controls'),
  CombatLog = require('../components/combat-log');

module.exports = React.createClass({
  getInitialState: function () {
    return {
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
    this.props.onCharacterUpdated(fight.attacker);
    this.setState({
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
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6 col-lg-4 col-xl-3">
            <Map level={this.props.character.continent} current={this.props.character.location}/>
          </div>
          <div className="col-md-6 col-lg-4 col-xl-3">
            <MoveControls character={this.props.character} onMove={this.props.onCharacterUpdated} />
          </div>
          <div className="col-md-12 col-lg-4 col-xl-6">
            <AreaInformation
              character={this.props.character}
              level={this.props.character.continent}
              area={this.props.character.location}
              onResult={this.onResult} />
          </div>
        </div>
        <CombatLog fight={this.state.fight} />
      </div>

    );
  }
});