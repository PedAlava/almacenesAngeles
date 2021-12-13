$(document).ready(function () {
function submit_message(user,message) {
    $.post( "/user", {user: user,message:message});
    obtener();
} 
$('#target').on('submit', function(e){
        e.preventDefault();
        const user = $('#user').val()
        const message = $('#message').val()
        alert(user)
        alert(message)
        submit_message(user,message)
        $('#user').val('')
        $('#message').val('')
});



function obtener(){
    $.get("/user", function(respuestaSolicitud){
        const desarrollador = document.querySelector('#example tbody');
        let html = '';
        respuestaSolicitud.body.forEach(desarrolladores => {
            //html += `<div>Nombre: <strong> ${desarrolladores.user}</strong> <br> Mensaje: <strong>${desarrolladores.message}</strong> <br>Hora: ${desarrolladores.date} 
            //</div>`
            html += `
                    <tr>
                        <th>${desarrolladores.user}</th>
                        <th>${desarrolladores.message}</th>
                        <th>${desarrolladores.date}</th>
                    </tr>`
           
            });
        desarrollador.innerHTML = html;
        })
}
$("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#example tbody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});
obtener()
})
