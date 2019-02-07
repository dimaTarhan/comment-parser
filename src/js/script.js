document.addEventListener("DOMContentLoaded", function () {

    let code;

    document.querySelector("#getFile").addEventListener("change", getCode);
    document.querySelector(".get-file").addEventListener("click", parseCode);

    function parseCode (e) {
        let target = e.target;
        if(!target.matches(".active-button"))return;
    }

    function getCode(e) {
        let target = e.target;
        let file = target.files[0];
        if(!file){
            document.querySelector(".start-button").classList.add("dt-button");
            document.querySelector(".start-button").classList.remove("active-button");
            return;
        }
        document.querySelector(".start-button").classList.add("active-button");
        document.querySelector(".start-button").classList.remove("dt-button");

        let reader = new FileReader();
        reader.onload = function (e) {
            code = e.target.result;
        };
        reader.readAsText(file);
    }

});