console.log(window.location.href);

const inbox = document.getElementById("inbox") as HTMLButtonElement|null ;
console.log(inbox);
inbox?inbox.onclick = () => handle("inbox"):""
const compose = document.getElementById("compose");
compose?compose.onclick = () => handleCompose(null, ""):null
const sent = document.getElementById("sent");
sent?sent.onclick = () => handle("sent"):null
const archive = document.getElementById("archive");
archive!.onclick = () => handle("archive");
const emailView = document.getElementById("emailsView");
const composeView = document.getElementById("composeView");
const loading = document.getElementById('loading')
const composeSubmit = document.getElementById("composeForm");
composeSubmit?composeSubmit.onsubmit = handleSubmitCompose:null
const subject=document.getElementById("subject") as HTMLInputElement|null
const recepiants=document.getElementById("recipiants") as HTMLInputElement|null
const composeLoadValue=document.getElementById("composeLoadValue") as HTMLInputElement|null
const composeFlag=document.getElementById("composeFlag")as HTMLInputElement|null
const body=document.getElementById("body") as HTMLInputElement|null
// loading.style.display='none'
var fetchCycle=0;

interface Email{
  id :string,
  sender: string,
  recipiants:string,
  subject:string,
  body:string,
  timestamp: string,
  read:boolean,
  archived:boolean,
  rawbody:string,
  replied:boolean,
  forward:boolean,
}
var previousValue:Email[];

handle("inbox");

function handle(state:string) :void{
  console.log("state hadle called");
  console.log(state);
  const topic=document.getElementById("topic")
  topic?topic.innerHTML = state.charAt(0).toUpperCase() + state.slice(1):null
  emailView?emailView.style.display = "block":null
  composeView?composeView.style.display = "none":null
  const detailedViewOfEmail=document.getElementById("detailedViewOfEmail")
  detailedViewOfEmail?detailedViewOfEmail.style.display = "none":null
  // loading 
  loading?loading.innerHTML=`<h3>Loading... ${state}<h3>`:null
  if (document.getElementById('listContainer')){
    
    document.getElementById('listContainer')!.innerHTML='';
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

function repetativelyFetchListOFMails(state:string='inbox',action:string='stop'){
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
function fetchListOfMails(state:string,from:string=''){
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

function handleCompose(value:Email |null, action:string = "") {
  console.log("!value");
  console.log(value);
  console.log("handlecompose");
  const topic=document.getElementById("topic")
  topic?topic.innerHTML = "New Mail":null
  emailView?emailView.style.display = "none":null
  composeView?composeView.style.display = "block":null
//   const body=document.getElementById("body") as HTMLInputElement|null
  body?body.disabled = false:null
//   const subject=document.getElementById("subject") as HTMLInputElement|null
  subject?subject.disabled = false:null
//   const recepiants=document.getElementById("recipiants") as HTMLInputElement|null
//   const composeFlag=document.getElementById("composeFlag")as HTMLInputElement|null
  if (value) {
    console.log("reply");
    console.log(value);

    if (action === "forward") {
      recepiants?recepiants.value = "":null
      subject?subject.value = `FWD : ${value.subject}`:null
      subject?subject.disabled = true:null
      if (value.forward) {
        body?body.value = value.rawbody.replace(/<br>/g,'\n'):null
      } else {
        body?body.value = `------------Forwarded message------------\nFrom : ${value.sender}\nTo : ${value.recipiants}\nDate : ${convertDate(value.timestamp)}\nSubject : ${value.subject}\nBody : ${value.body.replace(/<br>/g,'\n')}\n${value.replied?value.rawbody:''}`:null
      }
      body?body.disabled = true:null
      composeFlag?composeFlag.value = "forward":null
    } else {
        recepiants?recepiants.value = value.sender:null
        subject?subject.value = `RE : ${value.subject}`:null
        body?body.value = "":null

        composeFlag?composeFlag.value = "reply":null
    }
    // const composeLoadValue=document.getElementById("composeLoadValue") as HTMLInputElement|null
    composeLoadValue?composeLoadValue.value = JSON.stringify(value):null
  } else {
    recepiants?recepiants.value = "":null
    subject?subject.value = "":null
    body?body.value = "":null
    composeFlag?composeFlag.value = "":null
  }
}

function handleSubmitCompose(event:Event) {
  console.log("handleSubmitCompose");
//   console.log(CSRF_TOKEN);
  event.preventDefault();
  let recipiantsval = recepiants?recepiants.value:''
  let subjectval = subject?subject.value:''
  let Json_body = "";
  let rawbody = "";
  let replied = false;
  let forward = false;
  console.log("repply");

  if ((document.getElementById("composeFlag") as HTMLInputElement|null)!.value === "reply") {
    let value = JSON.parse(composeLoadValue?composeLoadValue.value:'{}');
    // console.log(
    //   `On ${value.timestamp} ${value.sender} wrote :\n ${
    //     value.body
    //   }\n------------------------Reply------------------------\n${
    //     document.getElementById("body").value
    //   }`
    // );
    console.log(value.replied);
    // console.log(
    //   `${value.replied ? value.body + "\n" : ""}On ${value.timestamp} ${
    //     value.sender
    //   } wrote :\n${
    //     value.rawbody
    //   }\n------------------------Reply------------------------\n${
    //     document.getElementById("body").value
    //   }`
    // );
    // body=`On ${value.timestamp} ${value.sender} wrote : ${value.body} <br><br> ------------------------Reply------------------------ <br><br> ${document.getElementById("body").value}`
    if (value.forward) {
        Json_body = `${value.replied ? value.body + "<br>" : ""}On ${
          convertDate(value.timestamp)
      } ${value.sender} wrote :<br>${
        value.body
      } <br><br> ------------------------Reply------------------------ <br><br>`;
    } else {
        Json_body = `${value.replied ? value.body + "<br>" : ""}On ${
          convertDate(value.timestamp)
      } ${value.sender} wrote :<br>${
        value.rawbody
      } <br><br> ------------------------Reply------------------------ <br><br>`;
    }
    composeFlag?composeFlag.value = "":null
    rawbody = body?body.value:''
    replied = true;
  } else if (composeFlag!.value === "forward") {
    let value = JSON.parse(composeLoadValue?composeLoadValue.value:'{}');
    console.log("Forward");
    composeFlag?composeFlag.value = "":null;
    console.log(
      `------------Forwarded message------------\nFrom : ${value.sender}\nTo : ${value.recipiants}\nDate : ${convertDate(value.timestamp)}\nSubject : ${value.subject}\nBody : ${value.body}`
    );
    if (value.forward) {
      Json_body = value.body;
      rawbody = body?body.value:''
    } else {
        Json_body = `------------Forwarded message------------<br><br><b>From</b> : ${value.sender}<br><b>To</b> : ${value.recipiants}<br><b>Date</b> : ${convertDate(value.timestamp)}<br><b>Subject</b> : ${value.subject}<br><b>Body</b> : ${value.body}<br>${value.replied?value.rawbody:''}`;
      rawbody = `------------Forwarded message------------\nFrom : ${value.sender}\nTo : ${value.recipiants}\nDate : ${convertDate(value.timestamp)}\nSubject : ${value.subject}\nBody : ${value.body}\n${value.replied?value.rawbody:''}`;
    }
    forward = true;
    console.log(body);
  } else {
    Json_body = body?body.value:''
    rawbody = Json_body;
  }

  const opt = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      //@ts-ignore
      "X-CSRFToken": CSRF_TOKEN,
    },
    body: JSON.stringify({
      recipiantsval,
      subjectval,
      Json_body,
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
function loadEmailsView(value:Email[], state:string) {
  if(state==='inbox'){
    previousValue=value

  }
  console.log('loading emails lsit view')
  if (document.getElementById("listContainer")) {
    const listContainer=document.getElementById("listContainer") as HTMLDivElement|null
    console.log("removed");
    listContainer?listContainer.remove():null
  }

  loading?loading.innerHTML=``:null
  const listContainer = document.createElement("div");
  listContainer.id = "listContainer";
  if (value.length===0){
    console.log("no emails")
    listContainer.innerHTML="<h3>No Emails received yet<h3>"
  }

  emailView?emailView.append(listContainer):null
  for (let i of value) {
    const list_inner_container = document.createElement("div");
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

    for (let j of prop) {
      const div = document.createElement("div");
      
      div.classList.add(`listView${j}`)

      div.innerHTML=(i[j])



      // only works for sent list view
      if(state==='sent' && j==='sender'){
        div.innerHTML=i['recipiants'] 
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
function fetchMail(value:Email, state:string) {
  repetativelyFetchListOFMails()
  console.log('fetch mail')
  console.log(value);
  const re_fo_ar=document.getElementById("re_fo_ar")
  if (state != "inbox") {
    re_fo_ar?re_fo_ar.style.display = "none":null
  } 
  else {
    re_fo_ar?re_fo_ar.style.display = "block":null
    if (!value.read){
      updateEmail(value.id,'read',true)
    }
  }
  const listContainer=document.getElementById("listContainer")
  listContainer?listContainer.style.display = "none":null
  const div = document.getElementById("detailedViewOfEmail");
  div?div.style.display = "block":null
  const D_subject=document.getElementById("D_subject")
  const D_sender=document.getElementById("D_sender")
  const D_time=document.getElementById("D_time")
  const D_recipiants=document.getElementById("D_recipiants")
  const D_body=document.getElementById("D_body")
  D_subject?D_subject.innerHTML = value.subject:null
  D_sender?D_sender.innerHTML = value.sender:null
  D_time?D_time.innerHTML =convertDate(value.timestamp):null
  D_recipiants?D_recipiants.innerHTML = value.recipiants:null

  if (value.replied) {
    console.log("value.replied");
    D_body?D_body.innerHTML = value.body + value.rawbody:null
  } else {
    D_body?D_body.innerHTML = value.body:null
  }
  const reply=document.getElementById("reply")
  const forward=document.getElementById("forward")
  const archive_mail=document.getElementById("archive_mail")

  reply?reply.onclick = () => {
    handleCompose(value, "reply");
  }:null
  forward?forward.onclick = () => {
    handleCompose(value, "forward");
  }:null
  archive_mail?archive_mail.onclick = () => {
    console.log('clicked archive')
    updateEmail(value.id, "archived" , true);
  }:null


}

function updateEmail(value:string,property:string,state:boolean){
  console.log('updateEmail')
  console.log(property)
  //@ts-ignore
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

function convertDate(_string:string):string{
  let date=new Date (Date.parse(_string))
  return date.toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:'numeric',minute:'numeric'}).replace(',','')
 
}

export{}