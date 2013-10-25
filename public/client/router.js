Shortly.Router = Backbone.Router.extend({

  routes: {
    "": "index",
    "create": "create",
    "stats": "stats"
  },

  el: $('body'),

  index: function(){
    console.log("ROUTER INDEX")
    var links = new Shortly.Links();
    var linksView = new Shortly.LinksView( {collection: links} );
    this.el.find('#container').html( linksView.render().el );
  },

  create: function(){
    console.log("CREATE")
    var linkCreateView = new Shortly.LinkCreateView();
    this.el.find('#container').html( linkCreateView.render().el );
  },

});