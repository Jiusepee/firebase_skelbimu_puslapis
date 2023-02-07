const adForm = () => {
  document.getElementById("root").innerHTML += `
        <form class="category-selection">
        <!-- category selection -->
        <h4 class="d-flex justify-content-center">Įveskite skelbimą</h4>
        <!-- dropdown category selection -->
        <div class="dropdown p-2">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" required>
            Pasirinkite prekes kategorija
          </button>
          <ul class="dropdown-menu" id="dropdown-menu" aria-labelledby="dropdownMenuButton1">
            <!-- <li><a class="dropdown-item" href="#">Action</a></li> -->
          </ul>
        </div>
        <!-- dropdown category selection end -->
        <!-- item name -->
        <div class="text-center w-25">
          <label for="exampleFormControlInput1" class="form-label">Prekes pavadinimas</label>
          <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Iveskite prekes pavadinimą" required>
        </div>
        <!-- price -->
        <label for="exampleFormControlInput1" class="form-label">Kaina</label>
        <div class="input-group w-25">
          <div class="input-group-prepend">
            <span class="input-group-text">€</span>
          </div>
          <input type="number" class="form-control price-input" aria-label="Amount (to the nearest euro)" required>
          <div class="input-group-append">
          </div>
        </div>
        <!-- item desc. -->
        <div class="m-2 w-25 text-center">
          <label for="exampleFormControlTextarea1" class="form-label">Prekes aprašymas</label>
          <textarea class="form-control desc-input" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
        <!-- post button -->
        <div class="d-flex justify-content-center">
          <button type="button" class="btn btn-warning" id="submitBtn">Paskelbti</button>
        </div>
</form>
      
    `;
};

export { adForm };
