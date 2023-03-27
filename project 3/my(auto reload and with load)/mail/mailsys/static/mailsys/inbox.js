console.log(window.location.href);

const inbox = document.getElementById("inbox");
console.log(inbox);
inbox.onclick = () => handle("inbox");
const compose = document.getElementById("compose");
compose.onclick = () => handleCompose(null, "");
const sent = document.getElementById("sent");
sent.onclick = () => handle("sent");
const archive = document.getElementById("archive");
archive.onclick = () => handle("archive");
const emailView = document.getElementById("emailsView");
const composeView = document.getElementById("composeView");
const composeSubmit = document.getElementById("composeForm");
composeSubmit.onsubmit = handleSubmitCompose;
const loading = document.getElementById('loading')
// loading.style.display='none'
var fetchCycle=0;
var previousValue=[];

handle("inbox");

function handle(state) {
  console.log("state hadle called");
  console.log(state);
  document.getElementById("topic").innerHTML =
    state.charAt(0).toUpperCase() + state.slice(1);
  emailView.style.display = "block";
  composeView.style.display = "none";
  document.getElementById("detailedViewOfEmail").style.display = "none";
  // loading 
  loading.innerHTML=`<h3>Loading... ${state}<h3>`
  if (document.getElementById('listContainer')){
    document.getElementById('listContainer').innerHTML='';
  }

  if (state==='inbox'){
    console.log('fetching')
    // fetchCycle=setInterval(()=>fetchListOfMails(state),2000)
    fetchListOfMails(state)
    repetativelyFetchListOFMails(state,'start')
  }
  else{
    console.log('clearInterval')
    repetativelyFetchListOFMails()
    // clearInterval(fetchCycle)
    fetchListOfMails(state)
  }



}

// continous refresh of mail lists

function repetativelyFetchListOFMails(state='inbox',action='stop'){
  console.log(state,action)
  if (action==='start'){

    clearInterval(fetchCycle)

    fetchCycle=setInterval(()=>fetchListOfMails(state,'repeatative'),1000)

  }
  else{

    clearInterval(fetchCycle)
  }
}

// main list of emails fetching code
function fetchListOfMails(state,from=''){
  console.log('fetching')
  fetch(state, { method: "GET" })
  .then((res) => res.json())
  .then((value) => {
    console.log(value);
    if (state==='inbox' && from==='repeatative'){
      if(value.length>previousValue.length){
        loadEmailsView(value, state);
      } 
    }else{
      loadEmailsView(value, state);
    }
  })
  .catch((err) => {
    console.log(err);
  });
  
}

function handleCompose(value, action = "") {
  console.log("!value");
  console.log(value);
  console.log("handlecompose");
  document.getElementById("topic").innerHTML = "New Mail";
  emailView.style.display = "none";
  composeView.style.display = "block";
  document.getElementById("body").disabled = false;
  document.getElementById("subject").disabled = false;
  if (value) {
    console.log("reply");
    console.log(value);

    if (action === "forward") {
      // const regex=new RegExp("'","g")
      // let conversion=value.rawbody.replace(/'/g,'"')
      // console.log(conversion)
      // console.log(value['rawbody'])
      // console.log(typeof(value['rawbody']))
      // let rawbody=JSON.parse(conversion)
      document.getElementById("recipiants").value = "";
      document.getElementById("subject").value = `FWD : ${value.subject}`;
      document.getElementById("subject").disabled = true;
      if (value.forward) {
        document.getElementById("body").value = value.rawbody;
      } else {
        document.getElementById(
          "body"
        ).value = `------------Forwarded message------------\nFrom : ${value.sender}\nTo : ${value.recipiants}\nDate : ${value.timestamp}\nSubject : ${value.subject}\nBody : ${value.body}`;
      }
      document.getElementById("body").disabled = true;

      document.getElementById("composeFlag").value = "forward";
    } else {
      document.getElementById("recipiants").value = value.sender;
      document.getElementById("subject").value = `RE : ${value.subject}`;
      document.getElementById("body").value = "";

      document.getElementById("composeFlag").value = "reply";
    }
    document.getElementById("composeLoadValue").value = JSON.stringify(value);
  } else {
    document.getElementById("recipiants").value = "";
    document.getElementById("subject").value = "";
    document.getElementById("body").value = "";
    document.getElementById("composeFlag").value = "";
  }
}

function handleSubmitCompose(event) {
  console.log("handleSubmitCompose");
  console.log(CSRF_TOKEN);
  event.preventDefault();
  let recipiants = document.getElementById("recipiants").value;
  let subject = document.getElementById("subject").value;
  let body = "";
  let rawbody = "";
  let replied = false;
  let forward = false;
  console.log("repply");
  console.log(document.getElementById("composeFlag").value);
  if (document.getElementById("composeFlag").value === "reply") {
    let value = JSON.parse(document.getElementById("composeLoadValue").value);
    console.log(
      `On ${value.timestamp} ${value.sender} wrote :\n ${
        value.body
      }\n------------------------Reply------------------------\n${
        document.getElementById("body").value
      }`
    );
    console.log(value.replied);
    console.log(
      `${value.replied ? value.body + "\n" : ""}On ${value.timestamp} ${
        value.sender
      } wrote :\n${
        value.rawbody
      }\n------------------------Reply------------------------\n${
        document.getElementById("body").value
      }`
    );
    // body=`On ${value.timestamp} ${value.sender} wrote : ${value.body} <br><br> ------------------------Reply------------------------ <br><br> ${document.getElementById("body").value}`
    if (value.forward) {
      body = `${value.replied ? value.body + "<br>" : ""}On ${
        value.timestamp
      } ${value.sender} wrote :<br>${
        value.body
      } <br><br> ------------------------Reply------------------------ <br><br>`;
    } else {
      body = `${value.replied ? value.body + "<br>" : ""}On ${
        value.timestamp
      } ${value.sender} wrote :<br>${
        value.rawbody
      } <br><br> ------------------------Reply------------------------ <br><br>`;
    }
    document.getElementById("composeFlag").value = "";
    rawbody = document.getElementById("body").value;
    replied = true;
  } else if (document.getElementById("composeFlag").value === "forward") {
    let value = JSON.parse(document.getElementById("composeLoadValue").value);
    console.log("Forward");
    document.getElementById("composeFlag").value = "";
    console.log(
      `------------Forwarded message------------\nFrom : ${value.sender}\nTo : ${value.recipiants}\nDate : ${value.timestamp}\nSubject : ${value.subject}\nBody : ${value.body}`
    );
    if (value.forward) {
      body = value.body;
      rawbody = document.getElementById("body").value;
    } else {
      body = `------------Forwarded message------------<br><br><b>From</b> : ${value.sender}<br><b>To</b> : ${value.recipiants}<br><b>Date</b> : ${value.timestamp}<br><b>Subject</b> : ${value.subject}<br><b>Body</b> : ${value.body}`;
      rawbody = `------------Forwarded message------------\nFrom : ${value.sender}\nTo : ${value.recipiants}\nDate : ${value.timestamp}\nSubject : ${value.subject}\nBody : ${value.body}`;
    }
    forward = true;
    console.log(body);
  } else {
    body = document.getElementById("body").value;
    rawbody = body;
  }

  const opt = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      "X-CSRFToken": CSRF_TOKEN,
    },
    body: JSON.stringify({
      recipiants,
      subject,
      body,
      rawbody,
      replied,
      forward,
    }),
  };
  fetch("compose", opt)
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      handle("sent");
    })
    .catch((error) => console.log(error));
}

// load email list view on index and other routes
function loadEmailsView(value, state) {
  if(state==='inbox'){
    previousValue=value

  }
  console.log('loading emails lsit view')
  if (document.getElementById("listContainer")) {
    console.log("removed");
    listContainer.remove();
  }
  emailsView = document.getElementById("emailsView");
  loading.innerHTML=``
  listContainer = document.createElement("div");
  listContainer.id = "listContainer";
  if (value.length===0){
    console.log("no emails")
    listContainer.innerHTML="<h3>No Emails received yet<h3>"
  }

  emailsView.append(listContainer);
  for (let i of value) {
    list_inner_container = document.createElement("div");
    if (i.read && state==='inbox'){
      list_inner_container.classList.add("list_inner_container_read");  
    }
    else{
      list_inner_container.classList.add("list_inner_container");
    }
    listContainer.append(list_inner_container);
    list_inner_container.id = i["id"];

    
    let x = list_inner_container.id;
    let info = i;
    list_inner_container.onclick = () => {
    console.log(x);
    return fetchMail(i, state);
      
      // console.log(i);
      // fun=()=>fetchMail
      // list_inner_container.onclick=fun
    }

    let prop = ["sender", "subject", "timestamp"];

    for (j of prop) {
      div = document.createElement("div");
      
      div.classList.add(`listView${j}`)
      
      div.innerHTML = i[j];



      // only works for sent list view
      if(state==='sent' && j==='sender'){
        div.innerHTML=i['recipiants'];
        if(div.innerHTML.length>50){
          div.innerHTML = `${div.innerHTML.slice(0,50)}...`
        }
      }

      

      // li.classList.add("emailViewsList");
      if (j === "timestamp") {
        div.classList.add("listTimestamp");
        div.innerHTML = convertDate(i[j]);
      }

      // to limit the lenght of string displayed in the list view
      // works for general list view this applys to all
      if(div.innerHTML.length>100){
        div.innerHTML = `${div.innerHTML.slice(0,100)}...`
      }


      list_inner_container.append(div);
    }
  }
}


// to get the detailed view of the mail
function fetchMail(value, state) {
  repetativelyFetchListOFMails()
  console.log('fetch mail')
  console.log(value);
  if (state != "inbox") {
    document.getElementById("re_fo_ar").style.display = "none";
  } 
  else {
    document.getElementById("re_fo_ar").style.display = "block";
    if (!value.read){
      updateEmail(value.id,'read',true)
    }
  }
  document.getElementById("listContainer").style.display = "none";
  div = document.getElementById("detailedViewOfEmail");
  div.style.display = "block";
  document.getElementById("D_subject").innerHTML = value.subject;
  document.getElementById("D_sender").innerHTML = value.sender;
  document.getElementById("D_time").innerHTML =convertDate(value.timestamp) ;
  document.getElementById("D_recipiants").innerHTML = value.recipiants;

  if (value.replied) {
    console.log("value.replied");
    document.getElementById("D_body").innerHTML = value.body + value.rawbody;
  } else {
    document.getElementById("D_body").innerHTML = value.body;
  }

  document.getElementById("reply").onclick = () => {
    handleCompose(value, "reply");
  };
  document.getElementById("forward").onclick = () => {
    handleCompose(value, "forward");
  };
  document.getElementById("archive_mail").onclick = () => {
    console.log('clicked archive')
    updateEmail(value.id, "archived" , true);
  };


}

function updateEmail(value,property,state){
  console.log('updateEmail')
  console.log(property)
  fetch(`updateMail/${value.toString()}`,{method:'PUT',headers:{"X-CSRFToken":CSRF_TOKEN},body:JSON.stringify({property,state})})
  .then((res)=>res.json())
  .then((val)=>{
    console.log(val)
    if (property==='archived'){
      handle('archive')
    }
  })
  .catch((err)=>{console.log(err)})

}

function convertDate(_string){
  let date=new Date (Date.parse(_string))
  return date.toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:'numeric',minute:'numeric'}).replace(',','')
  // .replace(/,/g,'&nbsp;')
  // return date.toLocaleDateString()
}

// function

// function reply(value){

// }

// const alert=document.getElementById('alert')

// setInterval(()=>{
//     console.log('im running')
//     if (alert.innerHTML!=""){
//         console.log('i ran')
//         setTimeout(()=>{alert.innerHTML=""},3000)
//     }
// },1000)
