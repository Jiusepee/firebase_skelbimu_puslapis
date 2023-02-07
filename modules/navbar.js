const navbarFunc = () => {
  document.getElementById("root").innerHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark" id="navbar2">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Skelbimų puslapis</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="/index.html">Mano skelbimai</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="/secondIndex.html">Visi skelbimai</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    `;
};

export { navbarFunc };
