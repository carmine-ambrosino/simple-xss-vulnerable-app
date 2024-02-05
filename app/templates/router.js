const baseHref ="file:///C:/Users/maria/Desktop/xss-vulnerable-app/xss-web_page-attack/index.html"

const route = (event) => {
    event = event || window.event;
    event.preventDefault();
    console.log(event.target.href)
    lastPath = event.target.href.split("/")[event.target.href.split("/").length - 1]
    console.log(lastPath)
    window.history.pushState({}, "", baseHref+"/"+lastPath);
    handleLocation();
};

const routes = {
    404: "/pages/404.html",
    "/": "/pages/index.html",
    "/medicine": "/pages/about.html",
    "/lorem": "/pages/lorem.html",
};

const handleLocation = async () => {
    const path = window.location.pathname;
    const route = routes[path] || routes[404];
    const html = "<div>"+path+"</div>"
    document.getElementById("presentation-screen").innerHTML = html;
};

window.onpopstate = handleLocation;
window.route = route;

handleLocation();