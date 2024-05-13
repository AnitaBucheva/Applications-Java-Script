import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getAllLikePerUser, getById, likeById, deleteById, getAllLikes } from "../api/data.js";


const detailsTemplate= (character, likes, user, isLiked, onDelete, onLike) => {

const isOwner = character._ownerId === user?.id;
return html`
<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${character.imageUrl} alt="example1" />
    <div>
    <p id="details-category">${character.category}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p id="description">
        ${character.description}
          </p>
           <p id ="more-info">
           ${character.moreInfo}
       </p>
      </div>
      <h3>Is This Useful:<span id="likes">${likes}</span></h3>
      ${user
         ? html`
         <div id="action-buttons">
             ${!isOwner && !isLiked
             ? html`<a href="" @click=${onLike} id="like-btn">Like</a>`
             : nothing}
             ${isOwner
               ? html `
           <a href="/edit/${character._id}" id="edit-btn">Edit</a>
           <a href="" @click=${onDelete} id="delete-btn">Delete</a>`
           : nothing} 
         </div>`
         : nothing}
         </div>
         </section>
`;
 }
export async function showDetails(ctx) {


   const characterId = ctx.params.id;
   const character = await getById(characterId);
 
   const likes = await getAllLikes(characterId)
 
   let isLiked = false;
   if (ctx.user) {
 
     isLiked = getAllLikePerUser(characterId, ctx.user.id)
   }
   ctx.render(detailsTemplate(character, likes, ctx.user, isLiked, onDelete, onLike));
 
 
   async function onDelete() {
 
     try {
       await deleteById(characterId);
 
       ctx.page.redirect('/dashboard');
     } catch (err) {
       console.log(err.message)
     }
   }
 
   async function onLike() {
 
     try {
       await likeById({ characterId: character._id });
       ctx.page.redirect('/details/' + characterId)
     } catch (err) {
       console.log(err.message)
     }
 
   }
 }
 
