/* user module for loggedin users */
var sessionID;

$(document).ready(async function () {
  setupSessionID();
});

function setupSessionID() {
  sessionID = $("#sessionID").val();
}

//TODO, make this just refresh the body content with a full get
function fullPageUpdate(url = undefined) {
  // debugger;
  console.log("refreshing page");
  if (url) {
    window.location.replace(url);
  } else {
    location.reload();
  }
}

async function openFormInModal(action, contentType, id) {
  await openEditForm(action, id);
  await openCreateForm(action, contentType);
}

async function openEditForm(action, id) {
  if (action === "edit") {
    let content = await dataService.getContentById(id);
    let form = await formService.getForm(
      content.contentTypeId,
      content,
      "await submitContent(submission);",
      undefined,
      undefined,
      undefined
    );

    $("#genericModal .modal-title").text(
      helperService.titleCase(`${action} ${content.contentTypeId}`)
    );

    $("#formio").empty();
    $("#formio").html(form);

    loadModuleSettingForm();

    $('input[name="data[title]"').focus();

    $("#genericModal").appendTo("body").modal("show");
  }
}

async function openCreateForm(action, contentType) {
  if (action === "create") {
    // let content = await dataService.getContentById(id);
    let form = await formService.getForm(
      contentType,
      undefined,
      "await submitContent(submission);",
      undefined,
      undefined,
      undefined
    );

    $("#genericModal .modal-title").text(
      helperService.titleCase(`${action} ${contentType}`)
    );

    $("#formio").empty();
    $("#formio").html(form);

    loadModuleSettingForm();

    $('input[name="data[title]"').focus();

    $("#genericModal").appendTo("body").modal("show");
  }
}

async function submitContent(
  submission,
  refresh = true,
  contentType = "content"
) {
  console.log("Submission was made!", submission);
  let entity = submission.data ? submission.data : submission;

  if (!contentType.startsWith("user")) {
    if (submission.id || submission.data.id) {
      await editInstance(entity, refresh, contentType);
    } else {
      await createInstance(entity, true, contentType);
    }
  } else {
    entity.contentType = contentType;

    let result = await axios({
      method: "post",
      url: "/form-submission",
      data: {
        data: entity,
      },
    });
    fullPageUpdate();
  }
}

async function editInstance(payload, refresh, contentType = "content") {
  if (contentType === "user") {
    contentType = "users";
  }
  debugger;
  dataService
    .editInstance(payload, sessionID)
    .then(async function (response) {
      // debugger;
      console.log("editInstance -->", response);
      // resolve(response.data);
      // return await response.data;
      if (response.contentTypeId === "page" && !globalService.isBackEnd()) {
        if (response.url) {
          window.location.href = response.url;
        } else {
          fullPageUpdate();
        }
      } else if (refresh) {
        fullPageUpdate();
      }
    })
    .catch(function (error) {
      console.log("editInstance", error);
    });
}
