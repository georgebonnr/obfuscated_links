window.Shortly = Backbone.View.extend({

  template: _.template(' \
      <h1>Shortly</h1> \
      <div class="navigation"> \
      <ul> \
        <li><a href="#" class="index">All Links</a></li> \
        <li><a href="#" class="create">Shorten</a></li> \
      </ul> \
      </div> \
      <div id="container"></div> \
      <div id="stats"></div>'
  ),

  events: {
    "click li a.index":  "renderIndexView",
    "click li a.create": "renderCreateView",
  },

  initialize: function(){
    console.log( "Shortly is running" );
    $('body').append(this.render().el);
    this.router = new Shortly.Router();
    Backbone.history.start({pushState: true});
  },

  render: function(){
    console.log(this.$el)
    this.$el.html( this.template() );
    this.updateNav('index');
    return this;
  },

  renderIndexView: function(e){
    e && e.preventDefault();
    this.router.navigate("", {trigger: true});
    this.updateNav('index');
  },

  renderCreateView: function(e){
    e && e.preventDefault();
    this.router.navigate("create", {trigger: true});
    this.updateNav('create');
  },

  updateNav: function(className){
    this.$el.find('.navigation li a')
            .removeClass('selected')
            .filter('.'+className)
            .addClass('selected');
  },
});