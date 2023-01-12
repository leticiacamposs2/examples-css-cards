window.onload = footer();
function footer() {
    let divFooter = document.getElementById("footer");
    let htmlFooter = `<div class="items">
        <a class="item youtube" href="https://www.youtube.com/channel/UCFRJPHvI3llNObmVCofgoqg" target="_blank">
            <img class="image" src="footerimages/youtube.png" />
        </a>
        <a class="item instagram" href="https://www.instagram.com/leticiacamposs2/" target="_blank">
            <img class="image" src="footerimages/instagram.png" />
        </a>
        <a class="item blog" href="https://medium.com/@leticiacamposs" target="_blank">
            <img class="image" src="footerimages/logo_150x150.png" />
        </a>
    </div>`;
    divFooter.innerHTML = htmlFooter;
}