document.addEventListener("DOMContentLoaded", function () {

    let originalCode;
    let editedCode;

    document.querySelector("#getFile").addEventListener("change", getCode);
    document.querySelector(".get-file").addEventListener("click", parseCode);

    function parseCode (e) {
        let target = e.target;
        if(!target.matches(".active-button"))return;
        let stringPattern = /((["'`])(?:(?:\\\\)|\\\2|(?!\\\2)\\|(?!\2).|[\n\r])*\2)/;
        let commentsPattern = /((["'`])(?:(?:\\\\)|\\\2|(?!\\\2)\\|(?!\2).|[\n\r])*\2)|\/\*.*\*\/|\/\*(.*[\n\r])*.*\*\/|\/\/.*/g;
        editedCode = originalCode.replace(commentsPattern, replacer);

        document.querySelector(".results__changed pre code").innerHTML = editedCode;
        document.querySelector(".results__original pre code").innerHTML = originalCode;
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });

        function replacer(reg) {
            if(stringPattern.test(reg)){
                return reg;
            }
            return "";
        }
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
            originalCode = e.target.result;
        };
        reader.readAsText(file);
    }

});