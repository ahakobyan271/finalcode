







var cart = {}


$('document').ready(function () {
    loadgoods()
    checkcart()

});
var general = []
//var matches=[]


function loadgoods() {


    $.getJSON('data.json', function (data) {


        // console.log(data)
        for (var key in data) {
            general.push(data[key])
        }
        //console.log(general)



        document.querySelectorAll('li').forEach(el => {
            el.addEventListener("click", srchfilter)

            function srchfilter(e) {
                console.log(e.target)
                var searchtext = document.getElementById('search')
                searchtext.value = e.target.innerHTML
                var searchtext = searchtext.value.toLowerCase()
                var matches = general.filter((key) => {
                    //console.log(general)
                    return (key.name.toLowerCase().trim().includes(searchtext))

                })
                console.log(matches)
                display(matches)
                checksearchtext()

                document.getElementById('search').addEventListener('input', checksearchtext)
                function checksearchtext() {
                    var searchtext = document.getElementById('search')

                    if (searchtext.value === 'All') {
                        matches = []

                        console.log(matches)
                        //document.getElementById('general1').innerHTML=""
                        display(general)
                    }


                }




            }


        }
        )











        const display = (matches) => {

            document.getElementById("general1").innerHTML = `
        ${matches.map(function (search) {

                return `<div class="cell"  >
            <img data-price=${search.price} class="detail img "  src="${search.photo}"   >
            
            
            <p class="price">$${search.price}</p>
            <p class="price"> ${search.name} </p>
            <button data-art=${search.id} class="addtodesignBtn">Add to my design</button>
            
    
            
        </div>`
            }).join("")

                }`
            addtocart()
        }
        display(general)



        /*const display=matches=>{
            var out=''
            for(var key in matches){
                console.log(key)
        out+='<div class="cell">';
        out+='<img data-price='+matches[key]['price']+' class="detail img "  src="'+matches[key]['photo']+'"   >';
        out+='<p class="price"> '+matches[key]['name']+'</p>'
        out+='<p class="price">$'+matches[key]['price']+'</p>'
        
        out+='<p class="count"> 0 </p>'
        out+='<button data-art="'+key+'">add to</button>'
        out+='</div>';
        
            }
        
            $('#general1').html(out);
        }*/
        // display(general)


    })
}






//filter  for search


var search = document.getElementById('search')



console.log(general)


function addtocart() {
    document.querySelectorAll('#general1 button').forEach(el => {
        el.addEventListener("click", addimg)

        function addimg() {
            var articul = $(this).attr('data-art')
            cart[articul] = 1

            localStorage.setItem('cart', JSON.stringify(cart))

        }
    })
}
console.log(cart)




function checkcart() {

    if (localStorage.getItem('cart') != null) {

        cart = JSON.parse(localStorage.getItem('cart'))
    }
}




var lists = document.querySelectorAll('li') //hide the list of details
function hide() {

    for (i = 0; i < lists.length; i++)

        lists[i].classList.add('hidden')


}

hide()





document.querySelector('.fa').addEventListener('click', function (e) { //show the list of details by click


    // console.log(e.target)

    for (i = 0; i < lists.length; i++)

        lists[i].classList.toggle('hidden')

})