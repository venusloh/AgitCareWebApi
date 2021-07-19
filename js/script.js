const modalWrapper = document.querySelector('.modal-wrapper');
// modal add
const addModal = document.querySelector('.add-modal');
const addModalForm = document.querySelector('.add-modal .form');

// modal edit
const editModal = document.querySelector('.edit-modal');
const editModalForm = document.querySelector('.edit-modal .form');

const btnAdd = document.querySelector('.btn-add');

const tableUsers = document.querySelector('.table-users');

let id;

// Create element and render users          
const renderUser = doc => {
  const tr = `
    <tr data-id='${doc.id}'>
    <td>${doc.data().Email}</td>
      <td>${doc.data().Username}</td>
      <td>${doc.data().Gender}</td>
      <td>${doc.data().Role}</td>
      <td>${doc.data().Result}</td>
      <td>${doc.data().Health}</td>
      <td>${doc.data().Duration}</td>
      <td>
        <button class="btn btn-edit">Edit</button>
        <button class="btn btn-delete">Delete</button>
      </td>
    </tr>
  `;
  console.log(doc);
  tableUsers.insertAdjacentHTML('beforeend', tr);


  // Click edit user
  const btnEdit = document.querySelector(`[data-id='${doc.id}'] .btn-edit`);
  btnEdit.addEventListener('click', () => {
    editModal.classList.add('modal-show');

    id = doc.id;
    
    editModalForm.Email.value = doc.data().Email;
    editModalForm.Username.value = doc.data().Username;
    editModalForm.Gender.value = doc.data().Gender;
    editModalForm.Role.value = doc.data().Role;
    editModalForm.Result.value = doc.data().Result;
    editModalForm.Health.value = doc.data().Health;
    editModalForm.Duration.value = doc.data().Duration;

    console.log(id);
  });

  // Click delete user
  const btnDelete = document.querySelector(`[data-id='${doc.id}'] .btn-delete`);
  btnDelete.addEventListener('click', () => {
    db.collection('users').doc(`${doc.id}`).delete().then(() => {
      console.log('Document succesfully deleted!');
    }).catch(err => {
      console.log('Error removing document', err);
    });
  });

}

// Click add user button
btnAdd.addEventListener('click', () => {
addModal.classList.add('modal-show');

  addModalForm.Email.value = doc.data().Email;
  addModalForm.Username.value = doc.data().Username;
  addModalForm.Gender.value = doc.data().Gender;
  addModalForm.Role.value = doc.data().Role;
  addModalForm.Result.value = doc.data().Result;
  addModalForm.Health.value = doc.data().Health;
  addModalForm.Duration.value = doc.data().Duration;
});

// User click anyware outside the modal
window.addEventListener('click', e => {
  if(e.target === addModal) {
    addModal.classList.remove('modal-show');
  }
  if(e.target === editModal) {
    editModal.classList.remove('modal-show');
  }
});

// Get all users
db.collection('users').get().then(querySnapshot => {
  querySnapshot.forEach(doc => {
    renderUser(doc);
  })
});

// Real time listener
db.collection('users').onSnapshot(snapshot => {
  snapshot.docChanges().forEach(change => {
    if(change.type === 'added') {
      renderUser(change.doc);
    }
    if(change.type === 'removed') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
    }
    if(change.type === 'modified') {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      renderUser(change.doc);
    }
  })
})

// Click submit in add modal
addModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').add({
    Email:  addModalForm.Email.value,
    Username: addModalForm.Username.value,
    Gender: addModalForm.Gender.value,
    Role: addModalForm.Role.value,
    Result: addModalForm.Result.value,
    Health: addModalForm.Health.value,
    Duration: addModalForm.Duration.value,
  });
  modalWrapper.classList.remove('modal-show');
});

// Click submit in edit modal
editModalForm.addEventListener('submit', e => {
  e.preventDefault();
  db.collection('users').doc(id).update({
    Email:  editModalForm.Email.value,
    Username: editModalForm.Username.value,
    Gender: editModalForm.Gender.value,
    Role: editModalForm.Role.value,
    Result: editModalForm.Result.value,
    Health: editModalForm.Health.value,
    Duration: editModalForm.Duration.value,
  });
  editModal.classList.remove('modal-show');
  
});
