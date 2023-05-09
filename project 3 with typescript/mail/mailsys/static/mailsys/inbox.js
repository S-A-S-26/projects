"use strict";

var inbox = document.getElementById("inbox");
console.log(inbox);
inbox ? inbox.onclick = function () { return handle("inbox"); } : "";
var compose = document.getElementById("compose");
compose ? compose.onclick = function () { return handleCompose(null, ""); } : null;
var sent = document.getElementById("sent");
sent ? sent.onclick = function () { return handle("sent"); } : null;
var archive = document.getElementById("archive");
archive.onclick = function () { return handle("archive"); };
var emailView = document.getElementById("emailsView");
var composeView = document.getElementById("composeView");
var loading = document.getElementById('loading');
var composeSubmit = document.getElementById("composeForm");
composeSubmit ? composeSubmit.onsubmit = handleSubmitCompose : null;
var subject = document.getElementById("subject");
var recepiants = document.getElementById("recipiants");
var composeLoadValue = document.getElementById("composeLoadValue");
var composeFlag = document.getElementById("composeFlag");
var body = document.getElementById("body");
// loading.style.display='none'
var fetchCycle = 0;
var previousValue;
handle("inbox");
function handle(state) {
    console.log("state hadle called");
    console.log(state);
    var topic = document.getElementById("topic");
    topic ? topic.innerHTML = state.charAt(0).toUpperCase() + state.slice(1) : null;
    emailView ? emailView.style.display = "block" : null;
    composeView ? composeView.style.display = "none" : null;
    var detailedViewOfEmail = document.getElementById("detailedViewOfEmail");
    detailedViewOfEmail ? detailedViewOfEmail.style.display = "none" : null;
    // loading 
    loading ? loading.innerHTML = "<h3>Loading... ".concat(state, "<h3>") : null;
    if (document.getElementById('listContainer')) {
        document.getElementById('listContainer').innerHTML = '';
    }
    if (state === 'inbox') {
        console.log('fetching');
        // fetchCycle=setInterval(()=>fetchListOfMails(state),2000)
        fetchListOfMails(state);
        repetativelyFetchListOFMails(state, 'start');
    }
    else {
        console.log('clearInterval');
        repetativelyFetchListOFMails();
        // clearInterval(fetchCycle)
        fetchListOfMails(state);
    }
}
// continous refresh of mail lists
function repetativelyFetchListOFMails(state, action) {
    if (state === void 0) { state = 'inbox'; }
    if (action === void 0) { action = 'stop'; }
    console.log(state, action);
    if (action === 'start') {
        clearInterval(fetchCycle);
        fetchCycle = setInterval(function () { return fetchListOfMails(state, 'repeatative'); }, 1000);
    }
    else {
        clearInterval(fetchCycle);
    }
}
// main list of emails fetching code
function fetchListOfMails(state, from) {
    if (from === void 0) { from = ''; }
    console.log('fetching');
    fetch(state, { method: "GET" })
        .then(function (res) { return res.json(); })
        .then(function (value) {
        console.log(value);
        if (state === 'inbox' && from === 'repeatative') {
            if (value.length > previousValue.length) {
                loadEmailsView(value, state);
            }
        }
        else {
            loadEmailsView(value, state);
        }
    })
        .catch(function (err) {
        console.log(err);
    });
}
function handleCompose(value, action) {
    if (action === void 0) { action = ""; }
    console.log("!value");
    console.log(value);
    console.log("handlecompose");
    var topic = document.getElementById("topic");
    topic ? topic.innerHTML = "New Mail" : null;
    emailView ? emailView.style.display = "none" : null;
    composeView ? composeView.style.display = "block" : null;
    //   const body=document.getElementById("body") as HTMLInputElement|null
    body ? body.disabled = false : null;
    //   const subject=document.getElementById("subject") as HTMLInputElement|null
    subject ? subject.disabled = false : null;
    //   const recepiants=document.getElementById("recipiants") as HTMLInputElement|null
    //   const composeFlag=document.getElementById("composeFlag")as HTMLInputElement|null
    if (value) {
        console.log("reply");
        console.log(value);
        if (action === "forward") {
            recepiants ? recepiants.value = "" : null;
            subject ? subject.value = "FWD : ".concat(value.subject) : null;
            subject ? subject.disabled = true : null;
            if (value.forward) {
                body ? body.value = value.rawbody.replace(/<br>/g, '\n') : null;
            }
            else {
                body ? body.value = "------------Forwarded message------------\nFrom : ".concat(value.sender, "\nTo : ").concat(value.recipiants, "\nDate : ").concat(convertDate(value.timestamp), "\nSubject : ").concat(value.subject, "\nBody : ").concat(value.body.replace(/<br>/g, '\n'), "\n").concat(value.replied ? value.rawbody : '') : null;
            }
            body ? body.disabled = true : null;
            composeFlag ? composeFlag.value = "forward" : null;
        }
        else {
            recepiants ? recepiants.value = value.sender : null;
            subject ? subject.value = "RE : ".concat(value.subject) : null;
            body ? body.value = "" : null;
            composeFlag ? composeFlag.value = "reply" : null;
        }
        // const composeLoadValue=document.getElementById("composeLoadValue") as HTMLInputElement|null
        composeLoadValue ? composeLoadValue.value = JSON.stringify(value) : null;
    }
    else {
        recepiants ? recepiants.value = "" : null;
        subject ? subject.value = "" : null;
        body ? body.value = "" : null;
        composeFlag ? composeFlag.value = "" : null;
    }
}
function handleSubmitCompose(event) {
    console.log("handleSubmitCompose");
    //   console.log(CSRF_TOKEN);
    event.preventDefault();
    var recipiantsval = recepiants ? recepiants.value : '';
    var subjectval = subject ? subject.value : '';
    var Json_body = "";
    var rawbody = "";
    var replied = false;
    var forward = false;
    console.log("repply");
    if (document.getElementById("composeFlag").value === "reply") {
        var value = JSON.parse(composeLoadValue ? composeLoadValue.value : '{}');
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
            Json_body = "".concat(value.replied ? value.body + "<br>" : "", "On ").concat(convertDate(value.timestamp), " ").concat(value.sender, " wrote :<br>").concat(value.body, " <br><br> ------------------------Reply------------------------ <br><br>");
        }
        else {
            Json_body = "".concat(value.replied ? value.body + "<br>" : "", "On ").concat(convertDate(value.timestamp), " ").concat(value.sender, " wrote :<br>").concat(value.rawbody, " <br><br> ------------------------Reply------------------------ <br><br>");
        }
        composeFlag ? composeFlag.value = "" : null;
        rawbody = body ? body.value : '';
        replied = true;
    }
    else if (composeFlag.value === "forward") {
        var value = JSON.parse(composeLoadValue ? composeLoadValue.value : '{}');
        console.log("Forward");
        composeFlag ? composeFlag.value = "" : null;
        console.log("------------Forwarded message------------\nFrom : ".concat(value.sender, "\nTo : ").concat(value.recipiants, "\nDate : ").concat(convertDate(value.timestamp), "\nSubject : ").concat(value.subject, "\nBody : ").concat(value.body));
        if (value.forward) {
            Json_body = value.body;
            rawbody = body ? body.value : '';
        }
        else {
            Json_body = "------------Forwarded message------------<br><br><b>From</b> : ".concat(value.sender, "<br><b>To</b> : ").concat(value.recipiants, "<br><b>Date</b> : ").concat(convertDate(value.timestamp), "<br><b>Subject</b> : ").concat(value.subject, "<br><b>Body</b> : ").concat(value.body, "<br>").concat(value.replied ? value.rawbody : '');
            rawbody = "------------Forwarded message------------\nFrom : ".concat(value.sender, "\nTo : ").concat(value.recipiants, "\nDate : ").concat(convertDate(value.timestamp), "\nSubject : ").concat(value.subject, "\nBody : ").concat(value.body, "\n").concat(value.replied ? value.rawbody : '');
        }
        forward = true;
        console.log(body);
    }
    else {
        Json_body = body ? body.value : '';
        rawbody = Json_body;
    }
    var opt = {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            //@ts-ignore
            "X-CSRFToken": CSRF_TOKEN,
        },
        body: JSON.stringify({
            recipiantsval: recipiantsval,
            subjectval: subjectval,
            Json_body: Json_body,
            rawbody: rawbody,
            replied: replied,
            forward: forward,
        }),
    };
    fetch("compose", opt)
        .then(function (res) { return res.json(); })
        .then(function (result) {
        console.log(result);
        handle("sent");
    })
        .catch(function (error) { return console.log(error); });
}
// load email list view on index and other routes
function loadEmailsView(value, state) {
    if (state === 'inbox') {
        previousValue = value;
    }
    console.log('loading emails lsit view');
    if (document.getElementById("listContainer")) {
        var listContainer_1 = document.getElementById("listContainer");
        console.log("removed");
        listContainer_1 ? listContainer_1.remove() : null;
    }
    loading ? loading.innerHTML = "" : null;
    var listContainer = document.createElement("div");
    listContainer.id = "listContainer";
    if (value.length === 0) {
        console.log("no emails");
        listContainer.innerHTML = "<h3>No Emails received yet<h3>";
    }
    emailView ? emailView.append(listContainer) : null;
    var _loop_1 = function (i) {
        var list_inner_container = document.createElement("div");
        if (i.read && state === 'inbox') {
            list_inner_container.classList.add("list_inner_container_read");
        }
        else {
            list_inner_container.classList.add("list_inner_container");
        }
        listContainer.append(list_inner_container);
        list_inner_container.id = i["id"];
        var x = list_inner_container.id;
        var info = i;
        list_inner_container.onclick = function () {
            console.log(x);
            return fetchMail(i, state);
            // console.log(i);
            // fun=()=>fetchMail
            // list_inner_container.onclick=fun
        };
        var prop = ["sender", "subject", "timestamp"];
        for (var _a = 0, prop_1 = prop; _a < prop_1.length; _a++) {
            var j = prop_1[_a];
            var div = document.createElement("div");
            div.classList.add("listView".concat(j));
            div.innerHTML = (i[j]);
            // only works for sent list view
            if (state === 'sent' && j === 'sender') {
                div.innerHTML = i['recipiants'];
                if (div.innerHTML.length > 50) {
                    div.innerHTML = "".concat(div.innerHTML.slice(0, 50), "...");
                }
            }
            // li.classList.add("emailViewsList");
            if (j === "timestamp") {
                div.classList.add("listTimestamp");
                div.innerHTML = convertDate(i[j]);
            }
            // to limit the lenght of string displayed in the list view
            // works for general list view this applys to all
            if (div.innerHTML.length > 100) {
                div.innerHTML = "".concat(div.innerHTML.slice(0, 100), "...");
            }
            list_inner_container.append(div);
        }
    };
    for (var _i = 0, value_1 = value; _i < value_1.length; _i++) {
        var i = value_1[_i];
        _loop_1(i);
    }
}
// to get the detailed view of the mail
function fetchMail(value, state) {
    repetativelyFetchListOFMails();
    console.log('fetch mail');
    console.log(value);
    var re_fo_ar = document.getElementById("re_fo_ar");
    if (state != "inbox") {
        re_fo_ar ? re_fo_ar.style.display = "none" : null;
    }
    else {
        re_fo_ar ? re_fo_ar.style.display = "block" : null;
        if (!value.read) {
            updateEmail(value.id, 'read', true);
        }
    }
    var listContainer = document.getElementById("listContainer");
    listContainer ? listContainer.style.display = "none" : null;
    var div = document.getElementById("detailedViewOfEmail");
    div ? div.style.display = "block" : null;
    var D_subject = document.getElementById("D_subject");
    var D_sender = document.getElementById("D_sender");
    var D_time = document.getElementById("D_time");
    var D_recipiants = document.getElementById("D_recipiants");
    var D_body = document.getElementById("D_body");
    D_subject ? D_subject.innerHTML = value.subject : null;
    D_sender ? D_sender.innerHTML = value.sender : null;
    D_time ? D_time.innerHTML = convertDate(value.timestamp) : null;
    D_recipiants ? D_recipiants.innerHTML = value.recipiants : null;
    if (value.replied) {
        console.log("value.replied");
        D_body ? D_body.innerHTML = value.body + value.rawbody : null;
    }
    else {
        D_body ? D_body.innerHTML = value.body : null;
    }
    var reply = document.getElementById("reply");
    var forward = document.getElementById("forward");
    var archive_mail = document.getElementById("archive_mail");
    reply ? reply.onclick = function () {
        handleCompose(value, "reply");
    } : null;
    forward ? forward.onclick = function () {
        handleCompose(value, "forward");
    } : null;
    archive_mail ? archive_mail.onclick = function () {
        console.log('clicked archive');
        updateEmail(value.id, "archived", true);
    } : null;
}
function updateEmail(value, property, state) {
    console.log('updateEmail');
    console.log(property);
    //@ts-ignore
    fetch("updateMail/".concat(value.toString()), { method: 'PUT', headers: { "X-CSRFToken": CSRF_TOKEN }, body: JSON.stringify({ property: property, state: state }) })
        .then(function (res) { return res.json(); })
        .then(function (val) {
        console.log(val);
        if (property === 'archived') {
            handle('archive');
        }
    })
        .catch(function (err) { console.log(err); });
}
function convertDate(_string) {
    var date = new Date(Date.parse(_string));
    return date.toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: 'numeric', minute: 'numeric' }).replace(',', '');
}
