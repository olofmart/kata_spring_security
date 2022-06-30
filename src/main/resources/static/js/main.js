initPage()

function initPage(){
    fetch('http://localhost:8080/api/user/current')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            showHeader(data);
            showNavigation(data);
            showInfo(data);
        });
}

function showInfo(currentUser){
    document.getElementById("add_form").hidden=true;
    let isAdmin = currentUser.roles.indexOf("ROLE_ADMIN") != -1
    if(isAdmin){
        showAdminPanelHeader()
        showAllUsersTableTitle()
        showAdminTable()
    } else {
        showUserPanelHeader()
        createPersonalUserTable(currentUser)
    }
}

function showNavigation(currentUser) {
    let htmlText = ""
    let isAdmin = currentUser.roles.indexOf("ROLE_ADMIN") != -1
    if(isAdmin){
        htmlText = htmlText + "<li class=\"nav-item\">\n" +
            "                    <a class=\"nav-link  active\" href='#' id='AdminButton' onclick='clickAdminButton()'>Admin</a>\n" +
            "                </li>" + "<li class=\"nav-item\">\n" +
            "                    <a class=\"nav-link\" href='#' id='UserButton' onclick='clickUserButton()'>User</a>\n" +
            "                </li>"
    } else {
        htmlText = "<li class=\"nav-item\">\n" +
            "                    <a class=\"nav-link active\">User</a>\n" +
            "                </li>"
    }


    document.getElementById("navigation_panel").innerHTML = htmlText
}

function showHeader(currentUser){
    document.getElementById("current_email").innerText = currentUser.email
    let rolesText = ""
    for(let i = 0; i<currentUser.roles.length; i++){
        if(i!=0){
            rolesText = rolesText + " "
        }
        rolesText = rolesText + currentUser.roles[i].slice(currentUser.roles[i].indexOf("_")+1)
    }
    document.getElementById("current_roles").innerText = rolesText
}
function showPersonalUserTable(){
    showUserPanelHeader()
    fetch('http://localhost:8080/api/user/current')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            createPersonalUserTable(data)
        });
}
function createPersonalUserTable(currentUser){
    document.getElementById("add_form").hidden=true
    document.getElementById("main_table").hidden=false
    document.getElementById("second_navigation_panel").innerHTML=""
    let headerRow = document.getElementById("table_header")
    let htmlText = "<tr>\n" +
        "                            <th>\n" +
        "                                ID\n" +
        "                            </th>\n" +
        "                            <th>\n" +
        "                                First name\n" +
        "                            </th>\n" +
        "                            <th>\n" +
        "                                Last name\n" +
        "                            </th>\n" +
        "                            <th>\n" +
        "                                Age\n" +
        "                            </th>\n" +
        "                            <th>\n" +
        "                                Email\n" +
        "                            </th>\n" +
        "                            <th>\n" +
        "                                Roles\n" +
        "                            </th>"

    headerRow.innerHTML = htmlText

    let tableData = document.getElementById("table_data")
    let currentRoles = ""
    for (let j = 0; j < currentUser.roles.length; j++) {
        if (j != 0) {
            currentRoles = currentRoles + " "
        }
        currentRoles = currentRoles + currentUser.roles[j].slice(currentUser.roles[j].indexOf("_") + 1)
    }
    htmlText = "<tr>" +
        "                            <td>" + currentUser.id + "</td>" +
        "                            <td>" + currentUser.name + "</td>" +
        "                            <td>" + currentUser.surname + "</td>" +
        "                            <td>" + currentUser.age + "</td>" +
        "                            <td>" + currentUser.email + "</td>" +
        "                            <td>\n" +
        currentRoles +
        "                            </td>\n" +
        "                        </tr>"

    tableData.innerHTML = htmlText
}

function showAdminPanelHeader(){
    document.getElementById("page_header").innerText="Admin panel"
}

function showAllUsersTableTitle(){
    document.getElementById("table_title").innerText="All users"
}

function showAddNewUserTableTitle(){
    document.getElementById("table_title").innerText="Add new user"
}


function showUserPanelHeader(){
    document.getElementById("page_header").innerText="User information page"
    document.getElementById("table_title").innerText="About user"
}

function showAdminTable(){
    let second_nav = document.getElementById("second_navigation_panel")
    second_nav.innerHTML = "<li class=\"nav-item\">\n" +
        "                    <a class=\"nav-link active\" href='#' onclick='clickAllUsersButton()' id='SecNavTableButton'>Users table</a>\n" +
        "                </li>\n" +
        "                <li class=\"nav-item\">\n " +
        "                    <a class=\"nav-link\" href='#' onclick='clickAddUserButton()' id='SecNavAddButton'>New User</a>\n" +
        "                </li>"

    let headerRow = document.getElementById("table_header")
    let htmlText = "<tr>\n" +
        "                            <th>\n" +
        "                                ID\n" +
        "                            </th>\n" +
        "                            <th>\n" +
        "                                First name\n" +
        "                            </th>\n" +
        "                            <th>\n" +
        "                                Last name\n" +
        "                            </th>\n" +
        "                            <th>\n" +
        "                                Age\n" +
        "                            </th>\n" +
        "                            <th>\n" +
        "                                Email\n" +
        "                            </th>\n" +
        "                            <th>\n" +
        "                                Role\n" +
        "                            </th>\n" +
        "                            <th>\n" +
        "                                Edit\n" +
        "                            </th>\n" +
        "                            <th>\n" +
        "                                Delete\n" +
        "                            </th>\n" +
        "                        </tr>"

    headerRow.innerHTML = htmlText

    updateUsersData()
}

function updateUsersData(){
    fetch('http://localhost:8080/api/admin/users')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            showUsersData(data)
        });
}



function showUsersData(users) {
    document.getElementById("add_form").hidden=true
    document.getElementById("main_table").hidden=false
    let tableBody = document.getElementById("table_data")
    let htmlText = ""
    for (let i = 0; i < users.length; i++) {
        let currentRoles = ""
        for (let j = 0; j < users[i].roles.length; j++) {
            if (j != 0) {
                currentRoles = currentRoles + " "
            }
            currentRoles = currentRoles + users[i].roles[j].slice(users[i].roles[j].indexOf("_") + 1)
        }
        htmlText = htmlText + "<tr>" +
            "                            <td>" + users[i].id + "</td>" +
            "                            <td>" + users[i].name + "</td>" +
            "                            <td>" + users[i].surname + "</td>" +
            "                            <td>" + users[i].age + "</td>" +
            "                            <td>" + users[i].email + "</td>" +
            "                            <td>" +
            currentRoles +
            "                            </td>" +
            "                            <td>\n" +
            "                                <button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#edit_modal_window\" onclick='clickEditButton("+users[i].id+")'>Edit</button>\n" +
            "                            </td>\n" +
            "                            <td>\n" +
            "                                <button type=\"button\" class=\"btn btn-danger\" data-toggle=\"modal\" data-target=\"#delete_modal_window\" onclick='clickDeleteButton("+users[i].id+")'>Delete</button>\n" +
            "                            </td>\n" +
            "                        </tr>"
    }
    tableBody.innerHTML = htmlText
}

function clickAdminButton() {
    showAdminTable()
    showAllUsersTableTitle()
    updateNavigationToAdmin()
}

function clickUserButton(){
    showUserPanelHeader()
    showPersonalUserTable()
    updateNavigationToUser()
}

function clickAddUserButton() {
    showAddNewUserTableTitle()
    clearAddUserForm()
    updateSecondNavigationToAdd()
    document.getElementById("main_table").hidden=true
    document.getElementById("add_form").hidden=false
    fetch('http://localhost:8080/api/admin/roles')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            updateRolesInForm(data, "add_form_roles")
        });

}

function clickAllUsersButton() {
    showAllUsersTableTitle()
    updateSecondNavigationToTable()
    updateUsersData()
    document.getElementById("main_table").hidden=false
    document.getElementById("add_form").hidden=true
}

function updateRolesInForm(roles, selectId) {
    let htmlText = ""
    for(let i = 0; i<roles.length; i++){
        htmlText = htmlText + "<option value=" + roles[i].value + " id="+roles[i].value+"_"+selectId+" size=>"+roles[i].value.slice(roles[i].value.indexOf("_")+1)+"</option>"
    }
    let selectElem = document.getElementById(selectId)
    selectElem.innerHTML = htmlText
    selectElem.size=roles.length

}

function updateNavigationToUser(){
    document.getElementById("AdminButton").classList.remove("active")
    document.getElementById("UserButton").classList.add("active")
}

function updateNavigationToAdmin(){
    document.getElementById("UserButton").classList.remove("active")
    document.getElementById("AdminButton").classList.add("active")
}

function updateSecondNavigationToAdd(){
    document.getElementById("SecNavTableButton").classList.remove("active")
    document.getElementById("SecNavAddButton").classList.add("active")
}

function updateSecondNavigationToTable(){
    document.getElementById("SecNavTableButton").classList.add("active")
    document.getElementById("SecNavAddButton").classList.remove("active")
}

function clickAddNewUser() {
    let form = document.getElementById("add_form")
    let params = new FormData(form)
    fetch("http://localhost:8080/api/admin/users", {
        method: 'POST',
        body: params
    }).then((response) => {
        return response.json();
    })
        .then((data) => {
            console.log("success adding:")
            console.log(data)
            clickAllUsersButton()
        });
}

function clearAddUserForm(){
    document.getElementById("name").value = null
    document.getElementById("surname").value=null
    document.getElementById("Age").value = null
    document.getElementById("Email").value = null
    document.getElementById("pass").value = null

}

function clickEditButton(id) {
    fetch('http://localhost:8080/api/admin/users/'+id)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            feelEditForm(data)
        });
    document.getElementById("edit_id_field").value=id
    document.getElementById("edit_name_field").value="name"+id
}

function clickDeleteButton(id) {
    fetch('http://localhost:8080/api/admin/users/'+id)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            feelDeleteForm(data)
        });
    document.getElementById("edit_id_field").value=id
    document.getElementById("edit_name_field").value="name"+id
}

function feelEditForm(user) {
    document.getElementById("edit_id_field").value=user.id
    document.getElementById("edit_name_field").value=user.name
    document.getElementById("edit_surname_field").value=user.surname
    document.getElementById("edit_age_field").value=user.age
    document.getElementById("edit_email_field").value=user.email
    document.getElementById("edit_pass_field").value=""
    fetch('http://localhost:8080/api/admin/roles')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            updateRolesInForm(data, "edit_roles_field")
            for(let i = 0; i<user.roles.length; i++){
                document.getElementById(user.roles[i]+"_edit_roles_field").setAttribute("selected", "selected")
            }
        });

}

function feelDeleteForm(user) {
    document.getElementById("delete_id_field").value=user.id
    document.getElementById("delete_name_field").value=user.name
    document.getElementById("delete_surname_field").value=user.surname
    document.getElementById("delete_age_field").value=user.age
    document.getElementById("delete_email_field").value=user.email
    fetch('http://localhost:8080/api/admin/roles')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            updateRolesInForm(data, "delete_roles_field")
            for(let i = 0; i<user.roles.length; i++){
                document.getElementById(user.roles[i]+"_delete_roles_field").setAttribute("selected", "selected")
            }
        });

}

function clickEditUserButton() {
    let form = document.getElementById("editUserForm")
    let params = new FormData(form)
    fetch("http://localhost:8080/api/admin/users", {
        method: 'PATCH',
        body: params
    }).then((response) => {
        return response.json();
    })
        .then((data) => {
            console.log("success edit:")
            console.log(data)
            clickAllUsersButton()
        });
}

function clickDeleteUserButton() {
    let form = document.getElementById("deleteUserForm")
    let params = new FormData(form)
    fetch("http://localhost:8080/api/admin/users/"+params.get("id"), {
        method: 'DELETE'
    }).then((response) => {
        return response.json();
    })
        .then((data) => {
            console.log("success deleting:")
            console.log(data)
            clickAllUsersButton()
        });
}