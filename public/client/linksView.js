Shortly.LinksView = Backbone.View.extend({

  className: 'links',

  template: _.template(' \
      <div class="sort_by"> \
        <ul> \
          <li><span><input class="filter" type="text" size="20"></span></li> \
          <li><b>Sort By:</b></li> \
          <li><span class="last-visited">Last Visited</span></li> \
          <li><span class="total-visits">Total Visits</span></li> \
        </ul> \
      </div>'
  ),

  initialize: function(){
    this.collection.on('sync', this.addAll, this);
    this.collection.fetch({data: {sortBy: 'updated_at'}});
  },

  events: {
    "click li span.total-visits":  "sortByVisits",
    "click li span.last-visited":  "sortByLastVisited",
    "change input.filter": "filterCollection"
  },

  render: function() {
    this.$el.empty();
    return this;
  },

  addAll: function(subCollection){
    if (!subCollection.models) {return;}
    this.$el.append(this.template());
    if (subCollection) {
      subCollection.forEach(this.addOne, this);
    } else {
      this.collection.forEach(this.addOne, this);
    }
  },

  addOne: function(item){
    var view = new Shortly.LinkView( {model: item} );
    this.$el.append(view.render().el);
  },

  filterCollection: function(){
    var $input = $('.filter')
    var subCollection = this.collection.filter(function(item){
      var a = $input.val()
      return (item.get("title")).match(a);
    });
    $input.val(' ');
    this.render();
    this.addAll(subCollection)
  },

  sortByVisits: function(){
    debugger
    this.collection.sort_by_visits();
    this.render();
    this.addAll();
  },

  sortByLastVisited: function(){
    this.collection.sort_by_updated_at();
    this.render();
    this.addAll();
  },

});