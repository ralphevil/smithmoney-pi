const url = "http://localhost:8080";

const btnScrollToTop = document.querySelector("#btnScrollToTop");
btnScrollToTop.addEventListener("click", function () {
    $("html, body").animate({ scrollTop: 0 }, "slow");
})

window.addEventListener("scroll", scrollFunction)
function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnScrollToTop.style.display = "block";
    } else {
        btnScrollToTop.style.display = "none";
    }
}