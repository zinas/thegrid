var
  React = require('react');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      characters: [],
      monsters: []
    };
  },
  componentDidMount: function () {
    this.getOthers(this.props.area.id);
    this.setupListeners();
  },
  componentWillReceiveProps: function (props) {
    this.getOthers(props.area.id);
    this.setupListeners();
  },
  getOthers: function (areaId) {
    io.socket.get('/area', {id: areaId}, ( function (area) {
      var characters = area.characters.filter((function (character) {
        return character.id !== this.props.character.id;
      }).bind(this));

      this.setState({
        characters: characters,
        monsters: area.monsters
      });
    }).bind(this) );
  },
  addCharacter: function (character) {
    var characters = this.state.characters;
    characters.push(character);
    this.setState({characters: characters});
  },
  addMonster: function (monster) {
    var monsters = this.state.monsters;
    monsters.push(monster);
    this.setState({monsters: monsters});
  },
  removeCharacter: function (character) {
    var characters = this.state.characters.filter(function (c) {
      return c.id !== character.id;
    });

    this.setState({characters: characters});
  },
  removeMonster: function (monster) {
    var monsters = this.state.monsters.filter(function (m) {
      return m.id !== monster.id;
    });

    this.setState({monsters: monsters});
  },
  setupListeners: function () {
    io.socket.off('character-left-area-'+this.props.area.id);
    io.socket.off('character-joined-area-'+this.props.area.id);
    io.socket.off('monster-left-area-'+this.props.area.id);
    io.socket.off('monster-joined-area-'+this.props.area.id);

    io.socket.on('character-left-area-'+this.props.area.id, this.removeCharacter);
    io.socket.on('character-joined-area-'+this.props.area.id, this.addCharacter);
    io.socket.on('monster-left-area-'+this.props.area.id, this.removeMonster);
    io.socket.on('monster-joined-area-'+this.props.area.id, this.addMonster);
  },

  fight: function (e) {
    io.socket.post('/game/fight', {
      target: e.currentTarget.getAttribute('data-target'),
      id: e.currentTarget.getAttribute('data-id')
    }, (function (result) {
      this.props.onResult(result);
    }).bind(this));
  },

  render: function() {
    return (
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h3 className="panel-title">
            {this.props.area.name}&nbsp;
            <small>{this.props.level.name} ({this.props.area.x},{this.props.area.y})</small>
          </h3>
        </div>
        <div className="panel-body">
          <p>{this.props.level.description}</p>
          {this.state.monsters.map( (function (monster) {
            return (
              <a
                key={monster.id}
                className="btn btn-danger btn-rounded btn-attack"
                onClick={this.fight}
                data-target="monster"
                data-id={monster.id}>
                <span className="fa fa-bug"></span> {monster.name} (lvl. {monster.level})
              </a>
            )
          }).bind(this))}
          {this.state.characters.map(function (character) {
            return (
              <a key={character.id} className="btn btn-danger btn-rounded" href={'/game/fight/character/'+character.id}>
                <span className="fa fa-male"></span> {character.name} (lvl. {character.level})
              </a>
            )
          })}
        </div>
      </div>
    );
  }
});













