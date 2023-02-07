const myAds = () => {
    const rootPlace = document.getElementById('root');
    const myAds = document.createElement('div');
    myAds.classList.add('my-3', 'navbar', 'navbar-light', 'bg-light');
    myAds.setAttribute("id", "myAds");
    myAds.innerText = "My Ads";

    //ad table
    let ad_table = document.createElement('table');
    ad_table.id = 'adsTable';
    ad_table.classList.add("table", "my-5");

    rootPlace.appendChild(myAds);
    rootPlace.appendChild(ad_table);

}

export { myAds }