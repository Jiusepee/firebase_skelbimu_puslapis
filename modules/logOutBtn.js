const logOutButton = () => {
  document.getElementById("navbarNav").innerHTML += `
    <button type="button" id="logoutBtn" class="btn btn-secondary">
            Log Out
          </button>
    `;
};

export { logOutButton };
