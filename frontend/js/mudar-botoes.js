const selectElemento = document.querySelector("#opcao")

function mudar_img(){
    if (selectElemento.value === "Pagar"){
        document.getElementById("confirmar").src="./resourses/img/verificado.svg"
        $('#check').modal('hide').reset;
    } else if (selectElemento.value === "Voltar"){
        document.getElementById("confirmar").src="./resourses/img/verificar.svg"
        $('#check').modal('hide').reset;
    } else {
        $('#check').modal('hide').reset;
    }
}
