
function doesLinkMatchWindowLocation(link){
  var len = link.length;
  var location = String(window.location);
  return (link==location || link+'#'==location);
}

var MenuItemSubLink = React.createClass({
  getInitialState: function(){
    return {
        hovered: false
    };
  },

  onMouseOverLink: function(){
    var state = this.state;
    state.hovered = true;
    this.setState(state);
  },
  onMouseLeaveLink: function(){
    var state = this.state;
    state.hovered = false;
    this.setState(state);
  },
  render: function(){
    return(
      <div>
        <h5 className={classNames({'selected': this.props.selected,
      'hovered': this.state.hovered && !this.props.selected})}
        onMouseOver={this.onMouseOverLink}
        onMouseLeave={this.onMouseLeaveLink}>
          <a href={this.props.link}>{this.props.title}</a>
        </h5>
      </div>
    )
  }
});

var MenuItem = React.createClass({
  getInitialState: function(){
    return {
        selected: this.props.selected,
        expanded: this.props.expanded,
        hovered: false
    };
  },

  onMouseOverItem: function(){
    var state = this.state;
    state.hovered = true;
    this.setState(state);
  },
  onMouseLeaveItem: function(){
    var state = this.state;
    state.hovered = false;
    this.setState(state);
  },
  onClickOnItem: function(){
    if(this.props.item.link=="#" && !this.state.selected){
      var state = this.state;
      state.expanded = !state.expanded;
      this.setState(state);
    }
  },


  render: function(){
    var subLinkComps = [];
    this.props.item.subitems.forEach(function(subitem){
      var selected = (doesLinkMatchWindowLocation(subitem.link)) ? true : false;
      subLinkComps.push(<MenuItemSubLink
             title={subitem.title}
             link={subitem.link}
             selected={selected}
            />);
    });
    if(this.state.expanded){
      return(
        <div>
          <h3 className={classNames({
            'selected': this.state.selected,
            'hovered' : this.state.hovered && (!this.state.selected)
          })}
          onMouseOver={this.onMouseOverItem}
          onMouseLeave={this.onMouseLeaveItem}>
            <a href={this.props.item.link}
            onClick={this.onClickOnItem}
            >
            {this.props.item.title}
            </a>
          </h3>
          {subLinkComps}
        </div>
      );
    }
    else{
      return(
        <div>
          <h3 className={classNames({
            'selected': this.props.selected,
            'hovered' : this.state.hovered && (!this.state.selected)
          })}
          onMouseOver={this.onMouseOverItem}
          onMouseLeave={this.onMouseLeaveItem}>
            <a href={this.props.item.link}
            onClick={this.onClickOnItem}
            >
            {this.props.item.title}
            </a>
          </h3>
        </div>
      );
    }

  }
});

var SideNav = React.createClass({
  render: function(){
    var items = [
      {
        title: "My Calendar",
        icon:"",
        link: HOSTNAME + "/calendar.html",
        subitems:[]
      },
      {
        title: "Manage Training",
        icon:"",
        link: HOSTNAME + "/training.html",
        subitems:[]
      },
      {
        title:"Contacts",
        icon: "",
        link: "#",
        subitems:[
          {
            title: "View",
            link: HOSTNAME + "/contacts/view.html"
          },
          {
            title: "Manage",
            link: HOSTNAME + "/contacts/manage.html"
          }
        ]
      },
      {
        title: "Messaging & Feedback",
        icon:"",
        link: HOSTNAME + "/messaging.html",
        subitems:[]
      },
      {
        title:"My Account",
        icon: "",
        link: "#",
        subitems:[
          {
            title: "Edit Info",
            link: HOSTNAME + "/account/info.html"
          },
          {
            title: "Edit Billing Info",
            link: HOSTNAME + "/account/billing.html"
          }
        ]
      }
    ];

    var comps = [];
    items.forEach(function(item){
      var selected = (doesLinkMatchWindowLocation(item.link)) ? true : false;
      var expanded = false;
      if(item.subitems.some(
        function(subitem){
          return (doesLinkMatchWindowLocation(subitem.link));
          }
      )){
        selected = true;
        expanded = true;
      }
      comps.push(<MenuItem item={item} selected={selected} expanded={expanded} />)
    });

    return(
      <div>
        {comps}
      </div>
    )
  }
});
ReactDOM.render(
  <SideNav />,
  document.getElementById('container')
);
