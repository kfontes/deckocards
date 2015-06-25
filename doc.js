$(function(){

  function Deck() {
    var thisDeck = this;
    this.suits = ['H', 'C', 'S', 'D'];
    this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'JK'];
    $.each(thisDeck.suits, function() {
      var suit = this;
      $.each(thisDeck.ranks, function() {
        var rank = this;
        var card = new Card(rank, suit);
        $('#deck').append(card.toHTML()).show();
      });
    });
  }

  function Card(rank, suit) {
    this.rank = rank;
    this.suit = suit;
    this.toHTML = function() {
      if(this.suit == 'D' || this.suit == 'H') {
        return "<li class='card red'>" + this.rank + " " + this.suit + "</li>";
      } else {
        return "<li class='card'>" + this.rank + " " + this.suit + "</li>";
      }
    } 
  }

  var shuffle = function(n) {
    var rand, $rand;
    rand = Math.floor(Math.random() * n--); 
    $('li:eq(' + n + ')').
      after($('li:eq(' + rand + ')')).
      fadeOut(300).
      insertBefore($('li:eq(' + rand + ')')).
      fadeIn(300)
    if(n) {
      setTimeout(shuffle, 0, n);
    }
  };

  var deck = new Deck();

  $('#shuffle').on('click', function() {
    shuffle($('.cards').length);
  });

  $('#remove').on('click', function() {
    $('li').each(function(index) {
      console.log($(this).html() + " " + index);
      if ($(this).html().indexOf('JK') >= 0){
        var newLi = $('li:eq(' + index + ')');
        $('#jokerDeck').append(newLi);
        $('#deck').remove(newLi);
      }
    });
  });
});    
