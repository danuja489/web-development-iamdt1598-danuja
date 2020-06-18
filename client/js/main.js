$(document).ready(function(){
    $(".owl-carousel").owlCarousel({
        items: 1,
        autoplay:true,
        loop:true,
        dots:true,
        nav:false
    });

    $("#placeInq").on('click',function () {
        const name  = $("#f_name").val();
        const address  = $("#address").val();
        const email  = $("#email").val();
        const msg  = $("#msg").val();

        $.post("http://localhost:8080",{name:name,address:address,email:email,msg:msg},function (data,status) {
            if(data==='success' && status==='success'){
                alert('Email Sent. Thank you')
            } else {
                alert('Server Error')
            }

        })
    })

    $("form").submit(function(e){
        e.preventDefault();
    });
});