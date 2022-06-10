let arrinfo = [];

function ShowBtn(id){
    if(document.getElementById(id).style.display == 'block'){
        document.getElementById(id).style.display = 'none';
    }else{
        document.getElementById(id).style.display = 'block';
    }   
}

function EditUser(idclass,id,pass,email,software,validade,hwid,vendedor){
    if(document.getElementById(idclass).style.display == 'block'){
        document.getElementById(idclass).style.display = 'none';
    }else{
        document.getElementById(idclass).style.display = 'block';
    }   
    document.getElementById('edit-email-user').value = email;
    document.getElementById('edit-pass-user').value = pass;
    document.getElementById("edit-sof-user").value = software;
    document.getElementById("edit-valid-user").value = validade;
    document.getElementById("edit-hwid-user").value = hwid;
    document.getElementById("edit-vendedor-user").value = vendedor;
    arrinfo.push(id); 

}

function UpdateUser(){
    let email = document.getElementById('edit-email-user').value;
    let senha = document.getElementById('edit-pass-user').value;
    let software = document.getElementById('edit-sof-user');
    var select = document.getElementById("edit-sof-user");
    var opcaoValor = select.options[select.selectedIndex].value;
    let validade = document.getElementById('edit-valid-user').value;
    let hwid = document.getElementById('edit-hwid-user').value;
    let vendedor = document.getElementById('edit-vendedor-user').value;
    fetch('http://localhost:3000/updateall/user', {
    method: 'POST',
    headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({email:email, senha:senha, software:opcaoValor, validade:validade, hwid:hwid, vendedor:vendedor})
    }).then(res => res.json())
    .then(res => console.log(res));
    setTimeout(()=>{
        window.location.href = "http://localhost:3000";
    },5000);
}

function CreateUser(){
    let email = document.getElementById('create-email-user').value;
    let senha = document.getElementById('create-pass-user').value;
    var select = document.getElementById("create-sof-user");
    var opcaoValor = select.options[select.selectedIndex].value;
    let validade = document.getElementById('create-valid-user').value;
    let hwid = document.getElementById('create-hwid-user').value;
    let vendedor = document.getElementById('create-vendedor-user').value;
    console.log(opcaoValor);
fetch('http://localhost:3000/create/user', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({email:email, senha:senha, software:opcaoValor, validade:validade, hwid:hwid, vendedor:vendedor})
}).then(res => res.json())
  .then(res => console.log(res));
  setTimeout(()=>{
    window.location.href = "http://localhost:3000";
},5000);

}

function DeleteUser(senha,email){

    fetch('http://localhost:3000/delete/user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:email, senha:senha})
      }).then(res => res.json())
        .then(res => console.log(res));
        setTimeout(()=>{
          window.location.href = "http://localhost:3000";
      },5000);
}

