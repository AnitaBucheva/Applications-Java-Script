import {get, post, put, del} from './api.js'

//populvame adresite
export async function getAllItems() {
    return get('/data/characters?sortBy=_createdOn%20desc')
}

export async function getById(id) {
    return get('/data/characters/' + id);

}
export async function createItem(data) {
    return post('/data/characters', data)
}

export async function deleteById(id){
    return del('/data/characters/' +id)
}

export async function editById(id, data){
    return put ('/data/characters/'+ id, data)
}

// Apply:
// export async function applyById(id){
//     return post ('/data/applications', id)
// }

//export async function getMyBook(id){
    //return get(`/data/books?where=_ownerId%3D%22${id}%22&sortBy=_createdOn%20desc`)
//}

export async function likeById(data) {
  return post('/data/useful', data);
}

export async function getAllLikes(characterId) {
   return get(`/data/useful?where=characterId%3D%22${characterId}%22&distinct=_ownerId&count`);
}

export async function getAllLikePerUser(characterId, userId) {
   return get(`:/data/useful?where=characterId%3D%22${characterId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
