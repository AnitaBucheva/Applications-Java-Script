import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllItems } from "../api/data.js";


const dashboardTemplate= (character) => html`

<h2>Characters</h2>
<section id="characters">
${character.length > 0 
?  character.map(cardTemplate)
: html`
<h2>No added Heroes yet.</h2>`
}
</section>`;

//dali e no oferr suobsht

// proverqwame ofer.----
const cardTemplate = (character)=> html` 
<div class="character">
  <img src=${character.imageUrl} alt="example1" />
  <div class="hero-info">
    <h3 class="category">${character.category}</h3>
    <p class="description">${character.description}</p>
    <a class="details-btn" href="/details/${character._id}">More Info</a>
  </div>`;

export async function showDashboard(ctx){
   

        const character = await getAllItems()
    
        //const user = getUserData();
    ctx.render(dashboardTemplate(character));
       
}