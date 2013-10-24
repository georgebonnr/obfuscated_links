Shortly.Links = Backbone.Collection.extend({

  model: Shortly.Link,

  url: '/links',

  _order_by: 'updated_at',

  comparator: function(item){
    if (this._order_by === 'visits'){
      return -item.get('visits');
    } else if (this._order_by === 'updated_at') {
      return -(new Date(item.get('updated_at'))).getTime();
    }
  },

  sort_by_visits: function(){
      this._order_by = 'visits';
      this.sort();
  },

  sort_by_updated_at: function(){
      this._order_by = 'updated_at';
      this.sort();
  },

});