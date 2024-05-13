import { html } from "../../node_modules/lit-html/lit-html.js";
import { getById, editById} from "../api/data.js";


// <form @submit=${onSubmit}  ,  .value=${offer.title}
const editTemplate= (character, onSubmit) => html`

        <section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Edit Character</h2>
            <form @submit=${onSubmit}class="edit-form">
              <input
              .value=${character.category}
              type="text"
              name="category"
              id="category"
              placeholder="Character Type"
            />
            <input
            .value=${character.imageUrl}
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
            .value=${character.description}
          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="2"
            cols="10"
            .value=${character.moreInfo}
          ></textarea>
              <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
        
`;

export async function showEdit(ctx){

    const character = await getById(ctx.params.id);

    ctx.render(editTemplate(character, onSubmit));
  
    async function onSubmit(event) {
      event.preventDefault();
  
  
      const formData = new FormData(event.target);
  
      const data = Object.fromEntries(formData);
  // name property koito sa napisani gore
      if (data.category == '' || data.imageUrl == '' || data.description == '' || data.moreInfo == '') {
        return;
      }
  
      try {
        await editById(ctx.params.id, data);
        event.target.reset();
        
        ctx.page.redirect('/details/' + ctx.params.id); // path?
      } catch (err) {
        alert(err.message);
      }
  
    }
  
}