var cart = {}

/*$('document').ready(function(){
    showcart()

});*/







$.getJSON('data.json', function (data) {
  var goods = data
  checkcart()
  console.log(cart)
  /* for(var key in data){
       general.push(data[key])
   }*/
  showcart()
  function showcart() {

    var out = ''
    for (var key in cart) {
      out += '<div class="cell">';
      out += '<img data-price=' + goods[key]['price'] + ' class="detail img "  src="' + goods[key]['photo'] + '"   >';
      out += '<p class="price"> ' + goods[key]['name'] + '</p>'
      out += '<p class="price">$' + goods[key]['price'] + '</p>'
      out += '<button class="addtocanvasBtn" data-price="' + goods[key]['price'] + '">add to</button>'
      //out+='<button  class="deletebtn" data-art="'+goods[key]['id']+'" >delete</button>'
      out += '<p class="count"> 0 </p>'

      out += '</div>';

    }
    $('#library1').html(out);
    addtocanvas()
    // deleteitem()
  }

})

















function checkcart() {

  if (localStorage.getItem('cart') != null) {

    cart = JSON.parse(localStorage.getItem('cart'))
  }

}


function addtocanvas() { //add detail to canvas attach price

  document.querySelectorAll('.addtocanvasBtn').forEach(el => {
    el.addEventListener("click", addimg)

    function addimg() {

      var cell = el.parentElement
      var imagesrc = cell.getElementsByTagName('img')[0].src



      fabric.Image.fromURL(imagesrc, img => {

        console.log(imagesrc)
        img.set({ price: parseFloat(this.dataset.price) });
        canvas.add(img);
        canvas.setActiveObject(img);

        console.log({ price: this.dataset.price })
        return false


      })
    }
  })

  updatecount()
}



function updatecount() { //update quantity of details in the column
  var count = 0
  document.querySelectorAll('#library1 button').forEach(el => {
    el.addEventListener("click", newcount)



    var count = 0


    function newcount(e) {
      count++
      displaynum()
    }

    function displaynum() {

      var cell = el.parentElement

      var countnum = cell.getElementsByClassName('count')[0]
      countnum.innerHTML = count
    }

  })


}


/*function deleteitem(){ //delete detail in the column

    document.querySelectorAll('.deletebtn').forEach(el=>{
      el.addEventListener("click", deleteit)
      
      function deleteit (){
         
      el.parentElement.remove()
     var articul=$(this).attr('data-art')
     console.log(articul)
    // cart[articul]=1
      localStorage.removeItem('cart')

       
      }

      
  })


}*/

document.getElementById('detail option10').addEventListener('click', function () {
  localStorage.removeItem('cart')
  document.getElementById('library1').innerHTML = ''

})