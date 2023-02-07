const createRegisterLoginForm = () => {
  document.getElementById("root").innerHTML = `
    <form class="mt-2">
        <div class="mb-3 w-25">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email-input" aria-describedby="emailHelp">
        </div>
        <div class="mb-3 w-25">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="pass-input">
        </div>
        <button type="submit" class="btn btn-secondary mb-2" id="loginBtn">Log In</button>
        <button type="submit" class="btn btn-secondary" id="registerBtn">Create Account</button>
      </form>
    `;
};

export { createRegisterLoginForm };
