var React = require('React');

module.exports = React.createClass({
  getInitialState: function () {
    return {
      characters: [],
      monsters: []
    };
  },
  componentDidMount: function () {
    this.getOthers(this.props.area.id);
    this.addListeners();
  },
  componentWillReceiveProps: function (props) {
    this.getOthers(props.area.id);
  },
  getOthers: function (areaId) {
    io.socket.get('/area', {id: areaId}, ( function (area) {
      this.setState({
        characters: area.characters,
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
  addListeners: function () {
    io.socket.on('character-left-area-'+this.props.area.id, this.removeCharacter);
    io.socket.on('character-joined-area-'+this.props.area.id, this.addCharacter);
    io.socket.on('monster-left-area-'+this.props.area.id, this.removeMonster);
    io.socket.on('monster-joined-area-'+this.props.area.id, this.addMonster);
  },


  render: function() {
    return (
      <div className="panel panel-danger">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.level.name} <small>({this.props.area.x},{this.props.area.y})</small></h3>
        </div>
        <div className="panel-body">
          <p>{this.props.level.description}</p>
          {this.state.monsters.map(function (monster) {
            return (
              <a key={character.id} className="btn btn-danger btn-rounded" href={'/game/fight/'+character.id}>
                <span className="fa fa-bug"></span> {monster.template.name} (lvl. {monster.template.level})
              </a>
            )
          })}
          {this.state.characters.map(function (character) {
            return (
              <a key={character.id} className="btn btn-danger btn-rounded" href={'/game/fight/'+character.id}>
                <span className="fa fa-male"></span> {character.name} (lvl. {character.level})
              </a>
            )
          })}
        </div>
      </div>
    );
  }
});













