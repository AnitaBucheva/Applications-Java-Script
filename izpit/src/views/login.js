import { html } from "../../node_modules/lit-html/lit-html.js";
import { login } from "../api/userAuth.js";

/* onSubmit na formata --  @submit=${onSubmit}   */
const loginTemplate= (onSubmit) => html`
<section id="login">
  <div class="form">
    <img class="border" src="./images/border.png" alt="">
    <h2>Login</h2>
    <form @submit=${onSubmit}class="login-form">
      <input type="text" name="email" id="email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <button type="submit">login</button>
      <p class="message">
        Not registered? <a href="/register">Create an account</a>
      </p>
    </form>
    <img class="border" src="./images/border.png" alt="">
  </div>
</section>
`;

export function showLogin(ctx) {
    ctx.render(loginTemplate(onSubmit));


    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);
       
        try {

            if (data.email == '' || data.password == '') { // check-prop
                return alert('All fields are required!');
            }
            await login(data.email, data.password);

            ctx.page.redirect('/') // check-redirect Path
        } catch (err) {
            alert(err.message);
        }

    }
}