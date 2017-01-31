$(document).ready(function(){
  get_clothing('shirts');
  get_clothing('pants');
  get_clothing('shoes');
 
  $('#checkout-form').submit(function(event){
    event.preventDefault();
    var frm = $(this);
    purchase_items(frm);
  })
});
 
var _clothing = {
  'shirts':[],
  'pants':[],
  'shoes':[],
}
 
var _checkout = [];
var total = 0.00;
 
function get_clothing(key){
 
    $.ajax({
      url:'http://174.129.248.23/brainstation/shop/'+key,
      type:'GET',
      data:{},
      dataType:'jsonp',
      success:function(data){
        _clothing[key] = data[key];
        draw_to_html(key);
      },
      error:function(data){
        console.log(data);
      }
    });
}
 
function draw_to_html(key){
 
  var items = _clothing[key];
  for(var i=0;i<items.length;i++){
      var item = items[i];
      var html = '<li>';
      html += '<img src="'+item.image+'">';
      html += '<div>'+item.name+'</div>';
      html += '<div>'+item.price+'</div>';
      //html +='<div>'+item.quantity+'</div>';
      html += '<form class="add-to-cart" action="">';
      html += '<input type="hidden" name="key" value="'+key+'">';
      html += '<input type="hidden" name="index" value="'+i+'">';
      html += '<select name="quantity">';
      html += '<option value="1">1</option>';
      html += '<option value="2">2</option>';
      html += '<option value="3">3</option>';
      html += '</select>';
      html += '<button class="primaryButton greyButton">Add to Cart</button>';
      html += '</form>';
      html += '</li>';
 
      $('#'+key).append(html);
  }
 
  $('.add-to-cart').unbind('submit');
  $('.add-to-cart').submit(function(event){
    event.preventDefault();
    var frm = $(this);
    add_to_checkout(frm);
  });
}
 
function add_to_checkout(frm){
var key = frm.find('input[name="key"]').val();
var index = frm.find('input[name="index"]').val();
var quantity = frm.find('select[name="quantity"]').val();
 
var item = _clothing[key][index];
item.quantity = quantity;
 
_checkout.push(item);
total = (parseFloat(item.price) * quantity) + total;
// total = parseFloat(item.price)*item.quantity + total;
 
  var html = '<li>';
  html += '<div>'+item.name+' x'+quantity+' - $'+item.price+'</div>';
  html += '</li>';
  $('#checkout-list').append(html);
  $('#checkout-total').html('$'+total.toFixed(2));
 
}
 
function purchase_items(frm){
  frm.find('input[name="total"]').val(total);
  frm.find('input[name="items"]').val(JSON.stringify(_checkout));
 
  $.ajax({
    url:frm.attr('action'),
    type:frm.attr('method'),
    data:frm.serialize(),
    dataType:'jsonp',
    success:function(data){
      console.log(data);
    },
    error:function(data){
      console.log(data);
    }
  })
}
 
// var purchase_button = "#purchase";
 
// $(purchase_button).click(function(){
//  window.alert='Successful purchase';
// });
//ajax call send to purchase

/*

    html += '<form id="add-item">';
    html += '<select id="quantity" name="quantity">';
    html += '<option value selected="selected">Choose one</option>';
    html += '<option>1</option>';
    html += '<option>2</option>';
    html += '<option>3</option>';
    html += '</select>';
    html += '<button id="product-1" data-name="item1" data-price="$20" class="add-to-cart">Buy Now</button>';
    html += '</form>';


*/

