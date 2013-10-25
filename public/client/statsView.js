Shortly.StatsView = Backbone.View.extend({

  list: "<% _.each(data, function(item) { %> <td><%= item[0] %></td> <% }); %>",

  initialize: function(){
    var that = this;
    this.model.fetch({
      data: this.model.get("id"),
      silent: true,
      success: function(response) {
        var data = response.attributes;
        that.render(data);
      }
    });
  },

  render: function(data) {
    var addMinutes = function(date, minutes) {
      return new Date(date.getTime() + minutes*60000);
    };

    var obj = _.filter(data, function(item) {if (item.link_id) { return item; }});
    var finalData = [];
    var sum = 0;
    var start = new Date(obj[0].created_at);
    _.each(obj, function(item) {
      var currentDate = new Date(item.created_at);
      if (currentDate > addMinutes(start,5)){
        start = addMinutes(start,5);
        var time = start.toString('yyyy-MM-dd');
        finalData.push([time, sum]);
        sum = 0;
      } else {
        sum += 1;
      }
    });

    console.log(finalData);

    this.$el.append(_.template(this.list, {data: finalData}));
    $('#stats').html( this.el );
  }
});