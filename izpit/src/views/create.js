import { html } from "../../node_modules/lit-html/lit-html.js";
import { createItem } from "../api/data.js";


//<form @submit=${onSubmit} 
const createTemplate= (onSubmit) => html`

<section id="create">
  <div class="form">
    <img class="border" src="./images/border.png" alt="">
    <h2>Add Character</h2>
    <form @submit=${onSubmit}class="create-form">
      <input
        type="text"
        name="category"
        id="category"
        placeholder="Character Type"
      />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
      />
      <textarea
      id="description"
      name="description"
      placeholder="Description"
      rows="2"
      cols="10"
    ></textarea>
    <textarea
      id="additional-info"
      name="additional-info"
      placeholder="Additional Info"
      rows="2"
      cols="10"
    ></textarea>
      <button type="submit">Add Character</button>
    </form>
    <img class="border" src="./images/border.png" alt="">
  </div>
</section>
`;

export function showCreate(ctx){
   
  

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData);

        
        if(Object.values(data).some(x=> x=='')){
            return alert('All fields are required!')
        }

        try {
            await createItem(data);
            ctx.page.redirect('/dashboard') //?path
            
        } catch (err) {
            alert(err.message);
        }
}
ctx.render(createTemplate(onSubmit)); 
}